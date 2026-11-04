// Game state and rules, ported from the Claude Design prototype's Component class.
// A tiny external store: React subscribes with useSyncExternalStore (see useGame.ts).
import docUrl from '../../../docs/PPCC 2026 Conference Summary.docx?url';
import { SESSIONS } from '../data/conference';
import { buildDeck, buildExpoDeck } from '../data/deck';
import type { Slide } from '../data/deck';

export type Screen = 'welcome' | 'hall' | 'class' | 'expo' | 'restroom' | 'coffee' | 'phone' | 'rob';
export type Key = 'up' | 'down' | 'left' | 'right' | 'A' | 'B';

export interface GameState {
  screen: Screen;
  wSel: 0 | 1;          // welcome: 0 = boring doc, 1 = join
  hSel: number;         // hallway list selection (sessions, then the expo row)
  sIdx: number;         // current session
  slide: number;        // current slide in the deck
  text: string;         // dialog text
  chars: number;        // typewriter progress
  done: string[];       // finished session ids
  wipe: boolean;        // screen transition
  zoom: string | null;  // slide photo shown full screen
}

const N = SESSIONS.length;
const STORE_KEY = 'conference-quest.done.v1';
const TYPE_MS = 28;
const START_TEXT = 'What will you do?';

const EXTRAS: Record<'restroom' | 'coffee' | 'phone', string> = {
  restroom: "ANTHONY: Hurry up, we can't be late!",
  coffee: 'GINO: Coffee time!',
  phone: '1 new message from Boss.',
};

function loadDone(): string[] {
  try {
    const ids = JSON.parse(localStorage.getItem(STORE_KEY) ?? '[]');
    return Array.isArray(ids) ? ids.filter((id) => SESSIONS.some((s) => s.id === id)) : [];
  } catch {
    return [];
  }
}

function saveDone(ids: string[]) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(ids));
  } catch {
    // Storage blocked: progress just isn't remembered.
  }
}

export class Game {
  state: GameState = {
    screen: 'welcome', wSel: 1, hSel: 0, sIdx: 0, slide: 0,
    text: START_TEXT, chars: 0, done: loadDone(), wipe: false, zoom: null,
  };

  private listeners = new Set<() => void>();
  private typer?: number;
  private timers = new Set<number>();
  private decks = new Map<number, Slide[]>();
  private expo?: Slide[];

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  };

  getState = () => this.state;

  private set(patch: Partial<GameState>) {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((fn) => fn());
  }

  private later(fn: () => void, ms: number) {
    const id = window.setTimeout(() => { this.timers.delete(id); fn(); }, ms);
    this.timers.add(id);
  }

  start() { this.say(this.state.text); }

  stop() {
    window.clearInterval(this.typer);
    this.timers.forEach((id) => window.clearTimeout(id));
    this.timers.clear();
    if (this.state.wipe) this.set({ wipe: false });
  }

  // ---- dialog ----
  say(text: string) {
    window.clearInterval(this.typer);
    this.set({ text, chars: 0 });
    this.typer = window.setInterval(() => {
      if (this.state.chars >= this.state.text.length) { window.clearInterval(this.typer); return; }
      this.set({ chars: this.state.chars + 1 });
    }, TYPE_MS);
  }

  typing() { return this.state.chars < this.state.text.length; }

  private finishTyping() { window.clearInterval(this.typer); this.set({ chars: this.state.text.length }); }

  // ---- decks ----
  deck(): Slide[] {
    if (this.state.screen === 'expo') return (this.expo ??= buildExpoDeck());
    const i = this.state.sIdx;
    if (!this.decks.has(i)) this.decks.set(i, buildDeck(SESSIONS[i]));
    return this.decks.get(i)!;
  }

  hallCount() { return N + 1; } // sessions + the expo hall row (always open)

  // ---- navigation ----
  go(screen: Screen, after?: () => void) {
    if (this.state.wipe) return;
    this.set({ wipe: true });
    this.later(() => {
      this.set({ screen, zoom: null });
      after?.();
      this.later(() => this.set({ wipe: false }), 60);
    }, 280);
  }

  hallText(done = this.state.done) {
    const c = done.length;
    if (c >= N) return "ANTHONY: That's every session! Time for the expo hall?";
    return c ? `GINO: Nice one. ${N - c} to go – where to next?` : 'GINO: So many sessions... ANTHONY: Which one first?';
  }

  toHall(msg?: string) { this.go('hall', () => this.say(msg || this.hallText())); }

  toStart() { this.go('welcome', () => { this.set({ wSel: 1 }); this.say(START_TEXT); }); }

  pick(i: number) {
    if (i < N) return this.enterSession(i);
    if (i === N) return this.enterExpo();
  }

  enterSession(i: number) { this.set({ hSel: i }); this.go('class', () => this.set({ sIdx: i, slide: 0 })); }

  enterExpo() {
    this.set({ hSel: N });
    this.go('expo', () => this.set({ slide: 0 }));
  }

  extra(name: 'restroom' | 'coffee' | 'phone') { this.go(name, () => this.say(EXTRAS[name])); }

  // Rob at the end of the hallway powers up.
  meetRob() { this.go('rob', () => this.say('ROB: CMS can build anything!')); }

  exitSession() {
    const s = this.state;
    if (s.screen === 'expo') return this.toHall('GINO: Best. Conference. Ever.');
    const last = s.slide >= this.deck().length - 1;
    const id = SESSIONS[s.sIdx].id;
    const done = last && !s.done.includes(id) ? [...s.done, id] : s.done;
    if (done !== s.done) saveDone(done);
    const next = SESSIONS.findIndex((x, i) => i > s.sIdx && !done.includes(x.id));
    const firstOpen = SESSIONS.findIndex((x) => !done.includes(x.id));
    const hSel = !last ? s.hSel : done.length >= N ? N : next >= 0 ? next : Math.max(firstOpen, 0);
    this.set({ done, hSel });
    this.toHall(last ? this.hallText(done) : "GINO: We'll catch the recording.");
  }

  resetProgress() {
    saveDone([]);
    this.set({ done: [], hSel: 0 });
    this.say('GINO: Fresh start! Every session is new again.');
  }

  nextSlide() {
    const n = this.deck().length;
    if (this.state.slide < n - 1) this.set({ slide: this.state.slide + 1 });
    else this.exitSession();
  }

  prevSlide() { this.set({ slide: Math.max(0, this.state.slide - 1) }); }

  hover(i: number) { if (!this.state.wipe && i >= 0 && i < this.hallCount()) this.set({ hSel: i }); }

  zoomIn(src: string) { this.set({ zoom: src }); }
  zoomOut() { this.set({ zoom: null }); }

  // ---- input ----
  press(k: Key) {
    const s = this.state;
    if (s.wipe) return;
    if (s.zoom) { this.zoomOut(); return; }
    switch (s.screen) {
      case 'welcome':
        if (k === 'left') this.set({ wSel: 0 });
        if (k === 'right') this.set({ wSel: 1 });
        if (k === 'A') {
          if (this.typing()) return this.finishTyping();
          if (s.wSel === 0) this.download(); else this.toHall();
        }
        break;
      case 'hall': {
        const n = this.hallCount();
        if (k === 'up') this.set({ hSel: (s.hSel + n - 1) % n });
        if (k === 'down') this.set({ hSel: (s.hSel + 1) % n });
        if (k === 'A') { if (this.typing()) return this.finishTyping(); this.pick(s.hSel); }
        if (k === 'B') this.toStart();
        break;
      }
      case 'class':
      case 'expo':
        if (k === 'right' || k === 'A' || k === 'down') this.nextSlide();
        if (k === 'left' || k === 'up') this.prevSlide();
        if (k === 'B') this.exitSession();
        break;
      default:
        if (k === 'A' || k === 'B') {
          if (this.typing() && k === 'A') return this.finishTyping();
          this.toHall(s.screen === 'rob' ? 'ANTHONY: You heard Rob. GINO: CMS can build anything.' : 'GINO: Back to it.');
        }
    }
  }

  download() {
    const a = document.createElement('a');
    a.href = docUrl;
    a.download = 'PPCC 2026 Conference Summary.docx';
    document.body.appendChild(a);
    a.click();
    a.remove();
    this.say("The boring document was downloaded... Sure you don't want to join them?");
    this.set({ wSel: 1 });
  }
}
