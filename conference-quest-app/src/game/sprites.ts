// SVG character sprites from the Claude Design prototype, as data: URIs (the code-app CSP allows data: images).
interface Look { hair: string; beard: string | null; skin: string; shirt: string; pants?: string }

const L = '#2a2030';
const uri = (svg: string, h = 140) =>
  'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 ${h}">${svg}</svg>`);
const person = (hair: string, beard: string | null, skin: string, shirt: string): Look => ({ hair, beard, skin, shirt });

const body = (p: Look) =>
  `<path d="M8 140 Q8 100 40 94 L80 94 Q112 100 112 140Z" fill="${p.shirt}" stroke="${L}" stroke-width="3" stroke-linejoin="round"/>` +
  `<rect x="49" y="80" width="22" height="20" rx="6" fill="${p.skin}" stroke="${L}" stroke-width="3"/>`;
const ears = (p: Look) =>
  `<circle cx="29" cy="58" r="7" fill="${p.skin}" stroke="${L}" stroke-width="3"/><circle cx="91" cy="58" r="7" fill="${p.skin}" stroke="${L}" stroke-width="3"/>`;
const bodyFull = (p: Look) => {
  const pc = p.pants || '#3a4060';
  return `<rect x="30" y="148" width="25" height="58" rx="8" fill="${pc}" stroke="${L}" stroke-width="3"/><rect x="65" y="148" width="25" height="58" rx="8" fill="${pc}" stroke="${L}" stroke-width="3"/>` +
    `<ellipse cx="41" cy="208" rx="19" ry="9" fill="#2a2030"/><ellipse cx="79" cy="208" rx="19" ry="9" fill="#2a2030"/>` +
    `<path d="M22 100 Q22 92 44 92 L76 92 Q98 92 98 100 L96 158 L24 158Z" fill="${p.shirt}" stroke="${L}" stroke-width="3" stroke-linejoin="round"/>` +
    `<rect x="5" y="98" width="19" height="62" rx="9" fill="${p.shirt}" stroke="${L}" stroke-width="3"/><rect x="96" y="98" width="19" height="62" rx="9" fill="${p.shirt}" stroke="${L}" stroke-width="3"/>` +
    `<circle cx="14" cy="167" r="8" fill="${p.skin}" stroke="${L}" stroke-width="3"/><circle cx="106" cy="167" r="8" fill="${p.skin}" stroke="${L}" stroke-width="3"/>` +
    `<rect x="49" y="80" width="22" height="20" rx="6" fill="${p.skin}" stroke="${L}" stroke-width="3"/>`;
};

function front(p: Look, full = false) {
  const beard = p.beard
    ? `<path d="M31 58 Q32 100 60 100 Q88 100 89 58 Q84 78 60 76 Q36 78 31 58Z" fill="${p.beard}" stroke="${L}" stroke-width="3" stroke-linejoin="round"/>`
    : '';
  return uri((full ? bodyFull(p) : body(p)) + ears(p) + `<ellipse cx="60" cy="54" rx="31" ry="35" fill="${p.skin}" stroke="${L}" stroke-width="3"/>` + beard +
    `<path d="M28 54 Q22 10 60 12 Q98 10 92 54 Q88 30 60 28 Q32 30 28 54Z" fill="${p.hair}" stroke="${L}" stroke-width="3" stroke-linejoin="round"/>` +
    `<circle cx="47" cy="56" r="4.5" fill="${L}"/><circle cx="73" cy="56" r="4.5" fill="${L}"/><circle cx="48.5" cy="54.5" r="1.5" fill="#fff"/><circle cx="74.5" cy="54.5" r="1.5" fill="#fff"/>` +
    `<path d="M40 46 Q47 42 54 46M66 46 Q73 42 80 46" stroke="${L}" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<path d="M52 82 Q60 89 68 82" stroke="${L}" stroke-width="3" fill="none" stroke-linecap="round"/>`, full ? 220 : 140);
}

function back(p: Look, full = false) {
  return uri((full ? bodyFull(p) : body(p)) + `<path d="M46 98 L60 108 L74 98" stroke="${L}" stroke-width="3" fill="none" stroke-linejoin="round"/>` + ears(p) +
    `<ellipse cx="60" cy="54" rx="32" ry="36" fill="${p.hair}" stroke="${L}" stroke-width="3"/>` +
    `<path d="M40 30 Q60 20 80 30M38 50 Q60 40 82 50" stroke="${L}" stroke-opacity=".25" stroke-width="4" fill="none" stroke-linecap="round"/>`, full ? 220 : 140);
}

function doc() {
  return uri(`<path d="M24 8 H78 L100 30 V132 H24Z" fill="#fff" stroke="${L}" stroke-width="4" stroke-linejoin="round"/>` +
    `<path d="M78 8 V30 H100" fill="#dfe5f0" stroke="${L}" stroke-width="4" stroke-linejoin="round"/>` +
    `<path d="M36 56 H88M36 72 H88M36 88 H88M36 104 H66" stroke="#b8c0d0" stroke-width="5" stroke-linecap="round"/>`);
}

// Rob: navy suit, white shirt, striped red tie, short dark hair and beard. `powered` = arms up,
// spiky gold hair, glowing eyes, shouting (the power-up scene).
function suited(p: Look, powered: boolean) {
  const navy = '#2b3044', navyDark = '#1a1e2e', pants = '#232838', gold = '#ffd84a';
  const defs = `<defs><pattern id="tie" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><rect width="7" height="7" fill="#b02a35"/><rect width="2.2" height="7" fill="#1f2f6e"/><rect x="3.6" width="0.8" height="7" fill="#f4f4f4"/></pattern></defs>`;
  const legs = `<rect x="30" y="148" width="25" height="58" rx="8" fill="${pants}" stroke="${L}" stroke-width="3"/><rect x="65" y="148" width="25" height="58" rx="8" fill="${pants}" stroke="${L}" stroke-width="3"/>` +
    `<ellipse cx="41" cy="208" rx="19" ry="9" fill="#1a1418"/><ellipse cx="79" cy="208" rx="19" ry="9" fill="#1a1418"/>`;
  const sleeve = (x1: number, y1: number, x2: number, y2: number) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${L}" stroke-width="25" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${navy}" stroke-width="19" stroke-linecap="round"/>`;
  const hand = (cx: number, cy: number, r: number) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${p.skin}" stroke="${L}" stroke-width="3"/>`;
  const arms = powered
    ? sleeve(28, 106, 10, 34) + sleeve(92, 106, 110, 34) + hand(8, 22, 10) + hand(112, 22, 10)
    : sleeve(18, 104, 14, 152) + sleeve(102, 104, 106, 152) + hand(14, 166, 8) + hand(106, 166, 8);
  const torso =
    `<rect x="49" y="80" width="22" height="18" rx="6" fill="${p.skin}" stroke="${L}" stroke-width="3"/>` +
    `<path d="M22 100 Q22 92 44 92 L76 92 Q98 92 98 100 L96 158 L24 158Z" fill="${navy}" stroke="${L}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M46 92 L60 128 L74 92Z" fill="#eef3fa" stroke="${L}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M56.5 97 L63.5 97 L66 124 L60 132 L54 124Z" fill="url(#tie)" stroke="${L}" stroke-width="2"/>` +
    `<path d="M55 92 L65 92 L63.5 98 L56.5 98Z" fill="#b02a35" stroke="${L}" stroke-width="2"/>` +
    `<path d="M46 92 L54 112 L49 116 L60 130M74 92 L66 112 L71 116 L60 130" fill="none" stroke="${navyDark}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M77 104 L87 104 L85 99 L81 102 L79 99Z" fill="#fff" stroke="${L}" stroke-width="1.5"/>` +
    `<circle cx="60" cy="142" r="2.4" fill="${navyDark}"/>`;
  const head = ears(p) + `<ellipse cx="60" cy="54" rx="31" ry="35" fill="${p.skin}" stroke="${L}" stroke-width="3"/>` +
    `<path d="M30 56 Q31 98 60 98 Q89 98 90 56 Q86 72 76 74 Q68 80 60 79 Q52 80 44 74 Q34 72 30 56Z" fill="${p.beard}" stroke="${L}" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M47 78 Q60 71 73 78 Q60 75 47 78Z" fill="${p.beard}" stroke="${L}" stroke-width="2"/>`;
  const face = powered
    ? `<circle cx="47" cy="57" r="5" fill="#2ad0c0" stroke="${L}" stroke-width="2"/><circle cx="73" cy="57" r="5" fill="#2ad0c0" stroke="${L}" stroke-width="2"/>` +
      `<circle cx="47" cy="57" r="1.6" fill="${L}"/><circle cx="73" cy="57" r="1.6" fill="${L}"/>` +
      `<path d="M37 43 L55 50M83 43 L65 50" stroke="#c89a10" stroke-width="5" stroke-linecap="round"/>` +
      `<ellipse cx="60" cy="87" rx="9" ry="8" fill="#5a1a22" stroke="${L}" stroke-width="2.5"/><path d="M53 90 Q60 85 67 90 Q60 94 53 90Z" fill="#e05a6a"/>`
    : `<circle cx="47" cy="56" r="4.5" fill="${L}"/><circle cx="73" cy="56" r="4.5" fill="${L}"/><circle cx="48.5" cy="54.5" r="1.5" fill="#fff"/><circle cx="74.5" cy="54.5" r="1.5" fill="#fff"/>` +
      `<path d="M39 46 Q47 41 55 45M65 45 Q73 41 81 46" stroke="${p.hair}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
      `<path d="M50 83 Q60 93 70 83Z" fill="#fff" stroke="${L}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const hair = powered
    ? `<path d="M27 58 L13 40 L28 40 L15 14 L36 26 L33 -8 L50 15 L58 -22 L67 13 L83 -10 L83 24 L105 12 L92 38 L108 42 L93 58 Q90 32 60 30 Q30 32 27 58Z" fill="${gold}" stroke="${L}" stroke-width="3" stroke-linejoin="round"/>` +
      `<path d="M40 24 L50 15 L56 -8 L60 18 L74 6 L72 26 Q60 22 40 24Z" fill="#fff3a6"/>`
    : `<path d="M28 54 Q22 12 60 13 Q98 12 92 54 Q90 34 78 30 Q62 36 44 30 Q32 34 28 54Z" fill="${p.hair}" stroke="${L}" stroke-width="3" stroke-linejoin="round"/>` +
      `<path d="M42 31 Q52 21 68 19" stroke="#5a4232" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  const svg = defs + legs + arms + torso + head + face + hair;
  const vb = powered ? '0 -26 120 246' : '0 0 120 220';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${svg}</svg>`);
}

const rob = person('#3b2a20', '#4a3426', '#f2c4a8', '#2b3044');

const gino = person('#2a2220', '#3a2e2a', '#f0c098', '#3868c8');
const anthony = person('#d04820', '#c04018', '#f8d0b0', '#389858');

export const SPRITES = {
  ginoFront: front(gino),
  anthonyFront: front(anthony),
  ginoBack: back(gino),
  anthonyBack: back(anthony),
  ginoFull: back(gino, true),
  anthonyFull: back(anthony, true),
  docSprite: doc(),
  instructor: front(person('#6a4a3a', null, '#e8b890', '#a84070'), true),
  host: front(person('#e0b040', null, '#e8b890', '#3878a8'), true),
  rob: suited(rob, false),        // viewBox 120x220
  robPowered: suited(rob, true),  // viewBox 120x246
  audience: [['#e0b040', '#a84070'], ['#181818', '#609838'], ['#8890a0', '#d07828'], ['#603820', '#505870'], ['#c8a070', '#3878a8']]
    .map(([h, c]) => back(person(h, null, '#e8b890', c))),
};

// Accent colors for the whiteboard stripe, cycled per session.
export const SESSION_COLORS = ['#a84070', '#3878a8', '#609838', '#d07828', '#505870', '#7a4aa8', '#2a8a8a', '#b85a30', '#4a6ab8', '#8a7a28', '#a83a3a'];
