import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useGame } from '../game/useGame';
import type { Slide } from '../data/deck';
import { APP_VERSION } from '../version';

// Static scenery copied from the design (our own markup, no user content). `display: contents`
// keeps the absolutely positioned pieces relative to the scene.
export function Decor({ html }: { html: string }) {
  return <div className="layer" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Stage({ children }: { children: ReactNode }) {
  const [vp, setVp] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  const [playAnyway, setPlayAnyway] = useState(false);
  useEffect(() => {
    const onResize = () => { setVp({ w: window.innerWidth, h: window.innerHeight }); };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); };
  }, []);
  const scale = Math.min(vp.w / 960, vp.h / 540);
  const portraitPhone = vp.h > vp.w && vp.w < 700;
  return (
    <div className="viewport">
      <div className="stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>{children}</div>
      {portraitPhone && !playAnyway && (
        <div className="rotate" role="dialog" aria-label="Turn your phone sideways">
          <div className="phone-icon" aria-hidden="true" />
          <div>Turn your phone sideways to play Conference Quest</div>
          <button type="button" onClick={() => setPlayAnyway(true)}>Play anyway</button>
        </div>
      )}
      <div className="version">v{APP_VERSION}</div>
    </div>
  );
}

export function DialogBox() {
  const { game, state } = useGame();
  const typing = state.chars < state.text.length;
  const onClick = () => {
    if (state.screen === 'hall') { if (typing) game.press('A'); return; }
    game.press('A');
  };
  return (
    <div role="button" tabIndex={0} className="btn dialog" onClick={onClick} aria-label="Continue">
      <div className="dialog-text" aria-live="polite">{state.text.slice(0, state.chars)}</div>
      {!typing && <div className="dialog-next" aria-hidden="true">▼</div>}
    </div>
  );
}

// Font size picked by text length, multiplied by --fit (shrunk by the auto-fit below when a slide is too long).
const size = (len: number, steps: [number, number][], min: number) => `calc(${steps.find(([max]) => len <= max)?.[1] ?? min}px * var(--fit, 1))`;

export function Whiteboard({ heading, kicker, color, deck }: { heading: string; kicker?: string; color: string; deck: Slide[] }) {
  const { game, state } = useGame();
  const i = Math.min(state.slide, deck.length - 1);
  const s = deck[i];
  const last = i >= deck.length - 1;
  const bulletLen = (s.bullets ?? []).join(' ').length;
  const bodyRef = useRef<HTMLDivElement>(null);

  // Shrink the text (down to 70%) until the slide fits the board without scrolling.
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    let fit = 1;
    el.style.setProperty('--fit', '1');
    while (el.scrollHeight - el.clientHeight > 1 && fit > 0.7) {
      fit = Math.round((fit - 0.05) * 100) / 100;
      el.style.setProperty('--fit', String(fit));
    }
  }, [i, deck]);

  return (
    <div className="board">
      <div style={{ height: 8, background: color, flex: 'none' }} />
      <div className="board-body" key={i} ref={bodyRef}>
        <div className="board-head">{i === 0 && kicker ? kicker : heading}</div>
        {s.image ? (
          <>
            <img className="photo" src={s.image} alt={`${s.caption} from ${heading}`} onClick={() => game.zoomIn(s.image!)} />
            <div className="caption">{s.caption} · click to zoom</div>
          </>
        ) : (
          <>
            {s.tag && <div className="tag">{s.tag}</div>}
            <div className="slide-title" style={{ fontSize: size(s.title.length, [[36, 30], [60, 26]], 22) }}>{s.title}</div>
            {s.text && <div className="slide-text" style={{ fontSize: size(s.text.length, [[140, 21], [210, 19]], 17) }}>{s.text}</div>}
            {s.bullets && (
              <div className="bullets">
                {s.bullets.map((b) => (
                  <div className="bullet" key={b} style={{ fontSize: size(bulletLen, [[150, 21], [260, 18]], 16) }}>
                    <span aria-hidden="true">▶</span><span style={{ textWrap: 'pretty' }}>{b}</span>
                  </div>
                ))}
              </div>
            )}
            {s.meta && <div className="meta">{s.meta.map((m) => <div key={m}>{m}</div>)}</div>}
          </>
        )}
      </div>
      <div className="board-foot">
        <button type="button" className="btn nav" onClick={() => game.prevSlide()} disabled={i === 0} style={{ color: i === 0 ? '#c8c8d0' : '#202028', cursor: i === 0 ? 'default' : 'pointer' }}>◀ PREV</button>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#6a667e' }}>{i + 1} / {deck.length}</div>
        <button type="button" className="btn nav" onClick={() => game.nextSlide()} style={{ color: '#a8305a' }}>{last ? 'FINISH ▶' : 'NEXT ▶'}</button>
      </div>
    </div>
  );
}

export function ZoomOverlay() {
  const { game, state } = useGame();
  if (!state.zoom) return null;
  return (
    <div role="button" tabIndex={0} className="btn zoom" onClick={() => game.zoomOut()} aria-label="Close the zoomed slide">
      <img src={state.zoom} alt="Zoomed slide" />
      <div>Click or press any key to close</div>
    </div>
  );
}
