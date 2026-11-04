// Loads the repo's conference data at build time (../data is the single source of truth).
import conferenceJson from '../../../data/conference.json';

export type Person = 'gino' | 'anthony';

export interface KeyPoint { heading: string; text: string; source?: string[] }
export interface Announcement { name: string; status: string; eta?: string; notes?: string }

export interface Session {
  id: string;
  order: number;
  title: string;
  deckTitle?: string;
  speakers: string[];
  date?: string;
  time?: string;
  sessionCode?: string;
  host?: string;
  notesFrom?: string;
  attendedBy: string[];
  tags: string[];
  summary: string;
  whyItMatters: string;
  keyPoints: KeyPoint[];
  announcements: Announcement[];
  perspectives: Record<string, string[]>;
  openQuestions: string[];
  resources: string[];
  slidesDir?: string | null;
  keySlides: string[];
}

export interface Conference {
  name: string;
  shortName: string;
  location: string;
  dates: { start: string; end: string };
  stats: Record<string, string>;
  themes: { id: string; title: string; text: string }[];
  recommendations: { action: string; priority: string; timing: string }[];
  keyDates: { date: string; item: string }[];
}

const sessionModules = import.meta.glob<Session>('../../../data/sessions/*.json', { eager: true, import: 'default' });

export const SESSIONS: Session[] = Object.values(sessionModules).sort((a, b) => a.order - b.order);
export const CONFERENCE = conferenceJson as unknown as Conference;

// Resized key slides made by scripts/prepare-assets.ps1 (src/assets/slides/<session-id>/<file>.jpg).
const slideUrls = import.meta.glob<string>('../assets/slides/*/*.jpg', { eager: true, query: '?url', import: 'default' });

export function slideUrl(sessionId: string, file: string): string | undefined {
  const name = file.replace(/\.[^.]+$/, '.jpg');
  return slideUrls[`../assets/slides/${sessionId}/${name}`];
}

export const NAMES: Record<string, string> = { gino: 'Gino', anthony: 'Anthony' };

export function attendedBy(s: Session): Person[] {
  return s.attendedBy.filter((p): p is Person => p === 'gino' || p === 'anthony');
}
