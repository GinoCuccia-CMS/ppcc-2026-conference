import { useGame } from '../game/useGame';
import { SESSION_COLORS, SPRITES } from '../game/sprites';
import { SESSIONS, attendedBy } from '../data/conference';
import type { Person } from '../data/conference';
import { Decor, Whiteboard } from './common';

const seatRow = (n: number, w: number, h: number, color: string, shine: string, r: number) =>
  Array.from({ length: n }, () => `<div style="width:${w}px;height:${h}px;background:${color};border-radius:${r}px ${r}px 0 0;box-shadow:inset 0 ${r === 10 ? 4 : 5}px 0 ${shine};"></div>`).join('');

const ROOM_BACK = `
<div style="position:absolute;left:0;right:0;top:0;height:380px;background:#e0d8c8;"></div>
<div style="position:absolute;left:0;right:0;top:372px;height:8px;background:#b8a890;"></div>
`;
const ROOM_FRONT = `
<div style="position:absolute;left:0;top:400px;width:780px;height:40px;display:flex;justify-content:space-around;padding:0 30px;box-sizing:border-box;">${seatRow(6, 84, 40, '#3858a0', '#5878c0', 10)}</div>
<div style="position:absolute;left:0;right:0;top:420px;height:120px;background:#6a5a4a;"></div>
`;
const FRONT_SEATS = `<div style="position:absolute;left:0;right:0;top:464px;height:76px;display:flex;justify-content:center;gap:16px;padding:0 20px;box-sizing:border-box;">${seatRow(4, 220, 76, '#2a4888', '#4868b0', 14)}</div>`;

function ExitDoor({ onExit }: { onExit: () => void }) {
  return (
    <>
      <div style={{ position: 'absolute', left: 860, top: 76, width: 60, height: 20, background: '#38a858', color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #206838', boxSizing: 'border-box' }}>EXIT</div>
      <div role="button" tabIndex={0} aria-label="Exit" title="Exit" className="exit-door" onClick={onExit}
        style={{ position: 'absolute', left: 850, top: 104, width: 80, height: 276, background: '#8a5a3a', border: '4px solid #503020', boxSizing: 'border-box', cursor: 'pointer' }}>
        <div style={{ position: 'absolute', left: 10, top: 130, width: 10, height: 10, borderRadius: '50%', background: '#e0b020', border: '2px solid #503020' }} />
        <div style={{ position: 'absolute', left: 18, top: 16, width: 36, height: 60, background: '#b8d8e8', border: '3px solid #503020', boxSizing: 'border-box' }} />
      </div>
    </>
  );
}

function FrontRow({ people }: { people: Person[] }) {
  return (
    <div style={{ position: 'absolute', left: 330, top: 384, width: 300, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 12 }}>
      {people.includes('gino') && <img src={SPRITES.ginoBack} alt="Gino" style={{ width: 144, height: 153, display: 'block' }} />}
      {people.includes('anthony') && <img src={SPRITES.anthonyBack} alt="Anthony" style={{ width: 144, height: 153, display: 'block' }} />}
    </div>
  );
}

function Audience() {
  return (
    <div style={{ position: 'absolute', left: 0, top: 358, width: 780, display: 'flex', justifyContent: 'space-around', padding: '0 30px', boxSizing: 'border-box' }}>
      {SPRITES.audience.map((a, i) => <img key={i} src={a} alt="" style={{ width: 68, height: 72, display: 'block' }} />)}
    </div>
  );
}

export function Classroom() {
  const { game, state } = useGame();
  const session = SESSIONS[state.sIdx];
  return (
    <div className="scene" style={{ background: '#7a6a58' }}>
      <Decor html={ROOM_BACK} />
      <Whiteboard heading={session.title} kicker={`SESSION ${session.order} OF ${SESSIONS.length}`} color={SESSION_COLORS[state.sIdx % SESSION_COLORS.length]} deck={game.deck()} />
      <img src={SPRITES.instructor} alt="Speaker" style={{ position: 'absolute', left: 732, top: 172, width: 109, height: 200, display: 'block' }} />
      <ExitDoor onExit={() => game.exitSession()} />
      <Audience />
      <Decor html={ROOM_FRONT} />
      <FrontRow people={attendedBy(session)} />
      <Decor html={FRONT_SEATS} />
    </div>
  );
}

// Expo hall finale: banner + booths, the conference-wide summary on the board, both heroes in front.
const BOOTHS = `
<div style="position:absolute;left:0;right:0;top:0;height:380px;background:repeating-linear-gradient(90deg,#2a3a6a 0 120px,#30427a 120px 240px);"></div>
<div style="position:absolute;left:0;right:0;top:372px;height:8px;background:#1a2448;"></div>
<div style="position:absolute;left:0;right:0;top:380px;height:160px;background:#48506a;"></div>
${[0, 1, 2, 3, 4, 5].map((i) => `<div style="position:absolute;left:${i * 160 + 10}px;top:392px;width:140px;height:26px;background:${['#a84070', '#3878a8', '#609838', '#d07828', '#7a4aa8', '#2a8a8a'][i]};border:3px solid #202028;border-radius:4px 4px 0 0;box-sizing:border-box;"></div>`).join('')}
`;

export function ExpoHall() {
  const { game } = useGame();
  return (
    <div className="scene" style={{ background: '#2a3a6a' }}>
      <Decor html={BOOTHS} />
      <Whiteboard heading="EXPO HALL – the big takeaways" kicker="EXPO HALL" color="#e0a020" deck={game.deck()} />
      <img src={SPRITES.host} alt="Expo host" style={{ position: 'absolute', left: 732, top: 172, width: 109, height: 200, display: 'block' }} />
      <ExitDoor onExit={() => game.exitSession()} />
      <div style={{ position: 'absolute', left: 300, top: 354, display: 'flex', alignItems: 'flex-end', gap: 14 }}>
        <img src={SPRITES.ginoFull} alt="Gino" style={{ width: 100, height: 183, display: 'block' }} />
        <img src={SPRITES.anthonyFull} alt="Anthony" style={{ width: 100, height: 183, display: 'block' }} />
      </div>
    </div>
  );
}
