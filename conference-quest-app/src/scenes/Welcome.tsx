import { useGame } from '../game/useGame';
import { SPRITES } from '../game/sprites';
import { SESSIONS } from '../data/conference';

export function Welcome() {
  const { game, state } = useGame();
  const left = state.wSel === 0;
  const border = (on: boolean) => (on ? '#a8305a' : '#202028');
  const inner = (on: boolean) => (on ? '#f0b8c8' : '#6878a8');
  const cardStyle = (on: boolean) => ({ border: `4px solid ${border(on)}`, boxShadow: `inset 0 0 0 3px #fff, inset 0 0 0 6px ${inner(on)}`, cursor: 'pointer' });

  return (
    <div className="scene" style={{ background: '#f8f8f0' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 420, background: 'repeating-linear-gradient(0deg,#e8f0f8 0 8px,#f0f4f8 8px 16px)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 14, textAlign: 'center', fontSize: 44, lineHeight: 1.1, fontWeight: 800 }}>CONFERENCE QUEST</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 68, textAlign: 'center', fontSize: 18, fontWeight: 700, color: '#a8305a' }}>— PPCC 2026 SESSION NOTES —</div>

      {state.done.length > 0 && (
        <button type="button" className="btn" onClick={() => game.resetProgress()}
          style={{ position: 'absolute', right: 20, top: 22, fontSize: 13, fontWeight: 800, color: '#6a667e', padding: '4px 8px', borderRadius: 4 }}>
          ★ {state.done.length}/{SESSIONS.length} · reset
        </button>
      )}

      <div style={{ position: 'absolute', left: 32, top: 108, width: 440, height: 300, display: 'flex' }}>
        <div role="button" tabIndex={0} aria-label="Download the boring session notes document" className="card" style={cardStyle(left)}
          onClick={() => { game.press('left'); game.download(); }} onMouseEnter={() => game.press('left')}>
          <div style={{ position: 'absolute', left: 14, top: 14, fontSize: 20, color: '#a8305a' }}>{left ? '▶' : ''}</div>
          <div style={{ position: 'relative', width: 96, height: 112 }}>
            <img src={SPRITES.docSprite} alt="" style={{ width: 96, height: 112, display: 'block' }} />
            <div style={{ position: 'absolute', left: -14, bottom: 8, width: 40, height: 40, background: '#2b579a', color: '#fff', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #181820' }}>W</div>
            <div style={{ position: 'absolute', right: -24, top: -10, fontSize: 16, color: '#8890a0' }}>z<span style={{ fontSize: 13 }}>z</span></div>
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.4, fontWeight: 800, textWrap: 'pretty' }}>Download the boring session notes document</div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 488, top: 108, width: 440, height: 300, display: 'flex' }}>
        <div role="button" tabIndex={0} aria-label="Join Anthony and Gino at the conference" className="card" style={cardStyle(!left)}
          onClick={() => game.toHall()} onMouseEnter={() => game.press('right')}>
          <div style={{ position: 'absolute', left: 14, top: 14, fontSize: 20, color: '#a8305a' }}>{!left ? '▶' : ''}</div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <img src={SPRITES.ginoFront} alt="Gino" style={{ width: 96, height: 114, display: 'block' }} />
              <div style={{ fontSize: 15, fontWeight: 800, color: '#3868c8' }}>GINO</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <img src={SPRITES.anthonyFront} alt="Anthony" style={{ width: 96, height: 114, display: 'block' }} />
              <div style={{ fontSize: 15, fontWeight: 800, color: '#c04018' }}>ANTHONY</div>
            </div>
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.4, fontWeight: 800, textWrap: 'pretty' }}>Join Anthony and Gino at the conference!</div>
        </div>
      </div>
    </div>
  );
}
