import { useEffect, useRef } from 'react';
import { useGame } from '../game/useGame';
import { SPRITES } from '../game/sprites';
import { SESSIONS, attendedBy } from '../data/conference';
import { Decor } from './common';

// Walls, floor, lights and the two far doors (102, 103) – straight from the design.
const WALLS = `
<div class="full" style="background:#f0e8d8;clip-path:polygon(0 0,960px 0,560px 175px,400px 175px);"></div>
<div class="full" style="background:#cfc3ae;clip-path:polygon(0 0,400px 175px,400px 253px,0 470px);"></div>
<div class="full" style="background:#cfc3ae;clip-path:polygon(960px 0,560px 175px,560px 253px,960px 470px);"></div>
<div class="full" style="background:#b8aa94;clip-path:polygon(0px 470px,0px 338.4px,400px 231.2px,400px 253px);"></div>
<div class="full" style="background:#b8aa94;clip-path:polygon(960px 470px,960px 338.4px,560px 231.2px,560px 253px);"></div>
<div class="full" style="background:#b8c8d0;clip-path:polygon(0 470px,400px 253px,560px 253px,960px 470px,960px 540px,0 540px);"></div>
<div class="full" style="background:#8fa6b8;clip-path:polygon(450px 253px,510px 253px,708px 540px,252px 540px);"></div>
<div style="position:absolute;left:400px;top:175px;width:160px;height:78px;background:#e4dccb;"></div>
<div style="position:absolute;left:430px;top:62.9px;width:100px;height:9.1px;background:#fff8d8;box-shadow:0 0 18px #fff8d8;"></div>
<div style="position:absolute;left:445px;top:107px;width:70px;height:7px;background:#fff8d8;box-shadow:0 0 18px #fff8d8;"></div>
<div style="position:absolute;left:455px;top:136.4px;width:50px;height:5.6px;background:#fff8d8;box-shadow:0 0 18px #fff8d8;"></div>
<div style="position:absolute;left:462.5px;top:158.5px;width:35px;height:4.5px;background:#fff8d8;box-shadow:0 0 18px #fff8d8;"></div>
<div style="position:absolute;left:157.7px;top:285.1px;width:7.6px;height:7.6px;border-radius:50%;background:#e0b020;pointer-events:none;"></div>
<div style="position:absolute;left:278.3px;top:257.9px;width:3.3px;height:3.3px;border-radius:50%;background:#e0b020;pointer-events:none;"></div>
<div class="full" style="background:#503020;clip-path:polygon(320px 199.5px,338.8px 200.7px,338.8px 286.5px,320px 296.7px);"><div class="full" style="background:#8a5a3a;clip-path:polygon(321.9px 205px,336.9px 205.5px,336.9px 287.5px,321.9px 295.6px);"></div></div>
<div style="position:absolute;left:333.2px;top:244.5px;width:3px;height:3px;border-radius:50%;background:#e0b020;pointer-events:none;"></div>
<div class="full" style="background:#503020;clip-path:polygon(368.4px 202.6px,377.9px 203.3px,377.9px 265.3px,368.4px 270.5px);"><div class="full" style="background:#8a5a3a;clip-path:polygon(369.3px 206.5px,376.9px 206.7px,376.9px 265.8px,369.3px 269.9px);"></div></div>
<div style="position:absolute;left:374.3px;top:234.3px;width:3px;height:3px;border-radius:50%;background:#e0b020;pointer-events:none;"></div>
<div style="position:absolute;left:114px;top:136.4px;width:48px;height:22px;background:#fff8e8;color:#202028;font-size:14px;font-weight:800;display:flex;align-items:center;justify-content:center;border-radius:3px;pointer-events:none;">101</div>
<div style="position:absolute;left:255.7px;top:157px;width:28px;height:28px;background:#2b5a78;border:2px solid #fff;border-radius:4px;box-sizing:border-box;pointer-events:none;"><div style="position:absolute;left:8px;top:2px;width:8px;height:8px;border-radius:50%;background:#fff;"></div><div style="position:absolute;left:5px;top:11px;width:14px;height:10px;border-radius:5px 5px 1px 1px;background:#fff;"></div></div>
<div style="position:absolute;left:313.4px;top:174.4px;width:32px;height:16px;background:#fff8e8;color:#202028;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;border-radius:3px;pointer-events:none;">102</div>
<div style="position:absolute;left:362.1px;top:184.4px;width:22px;height:12px;background:#fff8e8;color:#202028;font-size:8px;font-weight:800;display:flex;align-items:center;justify-content:center;border-radius:3px;pointer-events:none;">103</div>
`;

// Coffee machines and cups on the counter (the counter face itself is the button).
const machine = (left: number, top: number, scale: number, cup: string) =>
  `<div style="position:absolute;left:${left}px;top:${top}px;width:54px;height:70px;transform:scale(${scale});transform-origin:50% 100%;"><div style="position:absolute;inset:0;background:#8a8a9c;border:3px solid #202028;border-radius:8px 8px 4px 4px;box-sizing:border-box;"><div style="height:14px;background:#3a3a48;border-radius:5px 5px 0 0;"></div><div style="margin:6px auto 0;width:28px;height:16px;background:${cup};border:2px solid #202028;box-sizing:border-box;"></div><div style="position:absolute;right:5px;top:20px;width:6px;height:6px;border-radius:50%;background:#48c048;"></div></div><div style="position:absolute;left:19px;bottom:-4px;width:12px;height:10px;background:#202028;border-radius:0 0 3px 3px;"></div></div>`;
const COUNTER = `
<div style="position:absolute;inset:0;background:#c49a6c;clip-path:polygon(10px 28px,190px 76px,180px 82px,0 34px);"></div>
<div style="position:absolute;inset:0;background:#503020;clip-path:polygon(0 34px,180px 82px,180px 86px,0 38px);"></div>
${machine(3, -34, 0.65, '#5a3418')}${machine(63, -18, 0.75, '#5a3418')}${machine(118, -3, 0.85, '#d08a30')}
<div style="position:absolute;left:158px;top:45px;width:24px;height:28px;background:#fff;border:3px solid #202028;border-radius:2px 2px 7px 7px;box-sizing:border-box;"></div>
<div style="position:absolute;left:176px;top:49px;width:24px;height:28px;background:#fff;border:3px solid #202028;border-radius:2px 2px 7px 7px;box-sizing:border-box;"></div>
<div style="position:absolute;left:30px;top:94px;width:120px;height:30px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:800;transform:skewY(15deg);pointer-events:none;">COFFEE</div>
`;

export function Hallway() {
  const { game, state } = useGame();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = listRef.current?.querySelector<HTMLElement>('[data-sel="true"]');
    row?.scrollIntoView({ block: 'nearest' });
  }, [state.hSel]);

  return (
    <div className="scene" style={{ background: '#d8d0c0' }}>
      <Decor html={WALLS} />

      {/* Expo hall: the door at the end of the corridor */}
      <div role="button" tabIndex={0} aria-label="Expo hall" title="Expo hall"
        className="expo-door open" onClick={() => game.enterExpo()}
        style={{ position: 'absolute', left: 462, top: 196, width: 36, height: 57, background: '#c8902a', border: '2px solid #503020', boxSizing: 'border-box', cursor: 'pointer' }} />
      <div style={{ position: 'absolute', left: 446, top: 181, width: 68, height: 12, background: '#ffd84a', color: '#202028', fontSize: 8, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, pointerEvents: 'none' }}>EXPO HALL</div>

      {/* Rob, standing at the end of the corridor */}
      <div role="button" tabIndex={0} aria-label="Say hi to Rob" className="rob" onClick={() => game.meetRob()}>
        <span className="rob-tip">Say hi to Rob</span>
        <img src={SPRITES.rob} alt="Rob" />
      </div>

      {/* Room 101: back to start */}
      <div role="button" tabIndex={0} aria-label="Back to start" title="Back to start" className="door full" onClick={() => game.toStart()}
        style={{ background: '#503020', clipPath: 'polygon(96px 184.9px,180px 190.4px,180px 372.5px,96px 418px)', cursor: 'pointer' }}>
        <div className="door-face" style={{ clipPath: 'polygon(104.4px 198.3px,171.6px 200.4px,171.6px 377px,104.4px 413.4px)' }} />
      </div>
      <div style={{ position: 'absolute', left: 157.7, top: 285.1, width: 7.6, height: 7.6, borderRadius: '50%', background: '#e0b020', pointerEvents: 'none' }} />

      {/* Restroom */}
      <div role="button" tabIndex={0} aria-label="Restroom" title="Restroom" className="door full" onClick={() => game.extra('restroom')}
        style={{ background: '#503020', clipPath: 'polygon(251.4px 195px,288px 197.4px,288px 314px,251.4px 333.8px)', cursor: 'pointer' }}>
        <div className="door-face" style={{ clipPath: 'polygon(255.1px 203px,284.3px 203.9px,284.3px 316px,255.1px 331.8px)' }} />
      </div>

      {/* Coffee counter */}
      <div role="button" tabIndex={0} aria-label="Get coffee" title="Coffee" className="coffee" onClick={() => game.extra('coffee')}
        style={{ position: 'absolute', left: 760, top: 250, width: 200, height: 290, cursor: 'pointer' }}>
        <div className="coffee-face" style={{ position: 'absolute', inset: 0, background: '#8a5a3a', clipPath: 'polygon(0 34px,180px 82px,180px 208px,0 111px)' }} />
        <Decor html={COUNTER} />
      </div>

      <div style={{ position: 'absolute', left: 330, top: 265, display: 'flex', alignItems: 'flex-end', pointerEvents: 'none' }}>
        <img src={SPRITES.ginoBack} alt="Gino" style={{ width: 150, height: 159, display: 'block' }} />
        <img src={SPRITES.anthonyBack} alt="Anthony" style={{ width: 150, height: 159, display: 'block', marginLeft: -14 }} />
      </div>

      <button type="button" className="btn pill" style={{ left: 20, top: 16 }} onClick={() => game.extra('phone')}>Play hooky</button>

      <div className="panel" style={{ right: 20, top: 20, width: 420, padding: '10px 10px 8px' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#a8305a', padding: '0 8px 6px', display: 'flex', justifyContent: 'space-between' }}>
          <span>SESSIONS</span><span>★ {state.done.length}/{SESSIONS.length}</span>
        </div>
        <div className="session-list" ref={listRef} role="listbox" aria-label="Sessions">
          {SESSIONS.map((s, i) => {
            const people = attendedBy(s);
            const sel = i === state.hSel;
            return (
              <div key={s.id} role="option" aria-selected={sel} data-sel={sel} className={`btn row${sel ? ' sel' : ''}`}
                title={s.title} onClick={() => game.pick(i)}
                onMouseMove={() => { if (state.hSel !== i) game.hover(i); }}>
                <span style={{ fontSize: 14, lineHeight: 1.7 }}>{sel ? '▶' : ''}</span>
                <span className="t">{s.title}</span>
                <span className="chips" aria-label={people.length ? `Attended by ${people.join(' and ')}` : 'Nobody attended'}>
                  {people.includes('gino') && <span className="chip g">G</span>}
                  {people.includes('anthony') && <span className="chip a">A</span>}
                  {!people.length && <span className="chip none" title="Slides only">–</span>}
                </span>
                <span style={{ fontSize: 15, color: '#e0a020', lineHeight: 1.6 }}>{state.done.includes(s.id) ? '★' : ''}</span>
              </div>
            );
          })}
          {(
            <div role="option" aria-selected={state.hSel === SESSIONS.length} data-sel={state.hSel === SESSIONS.length}
              className={`btn row${state.hSel === SESSIONS.length ? ' sel' : ''}`} style={{ borderTop: '2px solid #d8d8e4', marginTop: 2 }}
              onClick={() => game.enterExpo()} onMouseMove={() => { if (state.hSel !== SESSIONS.length) game.hover(SESSIONS.length); }}>
              <span style={{ fontSize: 14, lineHeight: 1.7 }}>{state.hSel === SESSIONS.length ? '▶' : ''}</span>
              <span className="t" style={{ color: '#a8305a' }}>Expo hall – the big takeaways</span>
              <span />
              <span style={{ fontSize: 15, color: '#e0a020', lineHeight: 1.6 }}>✦</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
