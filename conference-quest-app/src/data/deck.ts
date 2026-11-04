// Turns a session (or the conference summary) into the slides shown on the classroom whiteboard.
import { CONFERENCE, NAMES, attendedBy, slideUrl } from './conference';
import type { Session } from './conference';

export interface Slide {
  title: string;
  tag?: string;          // small label above the title, e.g. "Gino + Anthony"
  text?: string;         // one paragraph
  bullets?: string[];
  meta?: string[];       // small grey lines under the text (speakers, date…)
  image?: string;        // slide photo URL
  caption?: string;
}

const chunk = <T,>(list: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
};

const who = (ids: string[] | undefined) => {
  const names = (ids ?? []).map((id) => NAMES[id] ?? id);
  return names.length === 2 ? `${names[0]} + ${names[1]}` : names.join(', ');
};

function when(s: Session): string | undefined {
  if (!s.date) return undefined;
  const d = new Date(`${s.date}T12:00:00`);
  const day = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  if (!s.time) return day;
  const [h, m] = s.time.split(':').map(Number);
  const t = new Date(2000, 0, 1, h, m).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${day} · ${t}`;
}

// Capitalizes the status words used in the data ("public preview" -> "Public preview").
const status = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function buildDeck(s: Session): Slide[] {
  const people = attendedBy(s);
  const meta = [
    s.speakers.length ? `Speakers: ${s.speakers.join(', ')}` : undefined,
    [when(s), s.sessionCode ? `Session ${s.sessionCode}` : undefined, s.host ? `Hosted by ${s.host}` : undefined].filter(Boolean).join(' · ') || undefined,
    people.length ? `Attended by ${who(people)}` : `Nobody made it to this one – ${s.notesFrom ?? 'slides only'}`,
  ].filter((x): x is string => !!x);

  const slides: Slide[] = [{ title: s.deckTitle || s.title, text: s.summary, meta }];

  if (s.whyItMatters) slides.push({ title: 'Why it matters', text: s.whyItMatters });

  for (const k of s.keyPoints) slides.push({ title: k.heading, text: k.text, tag: who(k.source) || undefined });

  chunk(s.announcements, 4).forEach((group, i, all) => slides.push({
    title: all.length > 1 ? `What's new (${i + 1}/${all.length})` : "What's new",
    bullets: group.map((a) => {
      const extra = [a.eta ? `ETA ${a.eta}` : undefined, a.notes].filter(Boolean).join(' – ');
      return `${a.name}: ${status(a.status)}${extra ? ` (${extra})` : ''}`;
    }),
  }));

  const photos = s.keySlides.map((f) => slideUrl(s.id, f)).filter((u): u is string => !!u);
  photos.forEach((src, i) => slides.push({ title: 'From the deck', image: src, caption: `Key slide ${i + 1} of ${photos.length}` }));

  for (const [author, lines] of Object.entries(s.perspectives ?? {})) {
    if (lines?.length) slides.push({ title: `How this applies to our work`, tag: NAMES[author] ?? author, bullets: lines });
  }

  chunk(s.openQuestions ?? [], 3).forEach((group, i, all) => slides.push({
    title: all.length > 1 ? `Open questions (${i + 1}/${all.length})` : 'Open questions', bullets: group,
  }));

  if (s.resources?.length) slides.push({ title: 'Links to look up', bullets: s.resources.slice(0, 5) });

  slides.push({
    title: 'Session complete! ★',
    bullets: [people.length === 1 ? `${NAMES[people[0]]} earned a badge.` : 'Gino & Anthony earned a badge.', 'Head out the EXIT door for the next session.'],
  });
  return slides;
}

export function buildExpoDeck(): Slide[] {
  const c = CONFERENCE;
  const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const slides: Slide[] = [{
    title: `Welcome to the ${c.shortName} Expo Hall!`,
    text: `${c.name} · ${c.location} · ${fmt(c.dates.start)}–${fmt(c.dates.end)}`,
    meta: Object.entries(c.stats ?? {}).map(([k, v]) => `${k === 'powerPlatformMAU' ? 'Power Platform monthly users' : k}: ${v}`),
  }];
  c.themes.forEach((t, i) => slides.push({ title: t.title, text: t.text, tag: `Big theme ${i + 1} of ${c.themes.length}` }));
  chunk(c.recommendations, 3).forEach((group, i, all) => slides.push({
    title: `What we recommend (${i + 1}/${all.length})`,
    bullets: group.map((r) => `${r.action} – ${r.priority} priority, ${r.timing}`),
  }));
  chunk(c.keyDates ?? [], 4).forEach((group, i, all) => slides.push({
    title: `Dates to watch (${i + 1}/${all.length})`,
    bullets: group.map((d) => `${/^\d{4}-\d{2}-\d{2}$/.test(d.date) ? fmt(d.date) : d.date}: ${d.item}`),
  }));
  slides.push({ title: 'Thanks for visiting the expo! ★', bullets: ['That was PPCC 2026 in a nutshell.', 'Head out the EXIT door to go back to the hallway.'] });
  return slides;
}
