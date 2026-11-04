// The three joke scenes from the design: restroom ("HURRY UP!"), coffee ("ENERGY!!!") and skip a session (the boss texts).
import { SPRITES } from '../game/sprites';
import { Decor } from './common';

const sink = (x: number) =>
  `<div style="position:absolute;left:${x}px;top:84px;width:120px;height:150px;background:#eaf5fa;border:6px solid #8aa8b8;border-radius:6px;box-sizing:border-box;overflow:hidden;"><div style="position:absolute;left:20px;top:-20px;width:26px;height:220px;background:#fff;opacity:.6;transform:rotate(20deg);"></div></div>` +
  `<div style="position:absolute;left:${x - 8}px;top:246px;width:136px;height:18px;background:#dfe6ea;border:3px solid #8aa8b8;border-radius:4px;box-sizing:border-box;"></div>` +
  `<div style="position:absolute;left:${x + 50}px;top:226px;width:20px;height:22px;border:5px solid #8a96a0;border-bottom:0;border-radius:10px 10px 0 0;box-sizing:border-box;"></div>` +
  `<div style="position:absolute;left:${x - 8}px;top:264px;width:136px;height:116px;background:#b8ced6;"></div>`;

const RESTROOM = `
<div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 59px,#b4cdd4 59px 61px),repeating-linear-gradient(90deg,transparent 0 59px,#b4cdd4 59px 61px);"></div>
<div style="position:absolute;left:0;right:0;top:380px;height:160px;background:#9fb4bc;"></div>
<div style="position:absolute;left:330px;top:14px;width:300px;height:40px;background:#2b5a78;color:#fff;font-size:20px;font-weight:800;display:flex;align-items:center;justify-content:center;border-radius:6px;">SESSION STARTS SOON</div>
${sink(24)}${sink(160)}${sink(680)}${sink(816)}
<div style="position:absolute;left:380px;top:74px;width:200px;height:200px;border-radius:50%;background:#fff;border:10px solid #d03a4a;box-sizing:border-box;box-shadow:0 8px 0 #a82a38;animation:shake .18s infinite;">
<div style="position:absolute;left:86px;top:20px;width:8px;height:80px;background:#202028;border-radius:4px;transform-origin:50% 100%;animation:spin 1.2s linear infinite;"></div>
<div style="position:absolute;left:84px;top:44px;width:12px;height:56px;background:#d03a4a;border-radius:4px;transform-origin:50% 100%;animation:spin 14s linear infinite;"></div>
<div style="position:absolute;left:84px;top:84px;width:16px;height:16px;border-radius:50%;background:#202028;"></div>
</div>
<div style="position:absolute;left:260px;right:260px;top:290px;text-align:center;font-size:60px;font-weight:800;color:#d03a4a;line-height:1;animation:pulse .4s infinite;">HURRY UP!</div>
<div style="position:absolute;left:260px;right:260px;top:362px;text-align:center;font-size:28px;font-weight:800;color:#202028;">Don't be late!</div>
<div style="position:absolute;left:30px;top:240px;display:flex;align-items:flex-end;gap:6px;animation:hop .45s infinite;">
<img src="${SPRITES.ginoFull}" alt="Gino" style="width:100px;height:183px;display:block;">
<img src="${SPRITES.anthonyFull}" alt="Anthony" style="width:100px;height:183px;display:block;">
</div>
`;

const bolt = (left: number, top: number, w: number, delay: number) =>
  `<div style="position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${Math.round(w * 1.4)}px;background:#ffd21e;clip-path:polygon(50% 0,100% 0,65% 40%,95% 40%,20% 100%,40% 55%,10% 55%);animation:flash .5s ${delay}s infinite;"></div>`;
const cup = (left: number) =>
  `<div style="position:absolute;left:${left}px;top:350px;width:34px;height:40px;background:#fff;border:4px solid #202028;border-radius:3px 3px 10px 10px;box-sizing:border-box;animation:buzz .12s infinite;"></div>`;

const COFFEE = `
<div style="position:absolute;left:0;right:0;top:330px;height:210px;background:#8a5a3a;"></div>
<div style="position:absolute;left:0;right:0;top:322px;height:14px;background:#a87450;"></div>
<div style="position:absolute;left:700px;top:96px;width:170px;height:234px;background:#3a3a48;border-radius:12px 12px 0 0;border:4px solid #202028;box-sizing:border-box;">
<div style="position:absolute;left:20px;top:20px;width:130px;height:60px;background:#7fd0a0;border:3px solid #202028;border-radius:6px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#202028;">COFFEE</div>
<div style="position:absolute;left:30px;top:104px;width:12px;height:12px;border-radius:50%;background:#e03050;animation:flash .4s infinite;"></div>
<div style="position:absolute;left:62px;top:120px;width:46px;height:20px;background:#202028;border-radius:4px;"></div>
<div style="position:absolute;left:58px;top:164px;width:54px;height:60px;background:#fff;border:4px solid #202028;border-radius:4px 4px 12px 12px;box-sizing:border-box;"><div style="position:absolute;left:0;right:0;top:0;height:20px;background:#5a3418;"></div></div>
</div>
${bolt(60, 110, 70, 0)}${bolt(150, 40, 50, 0.15)}${bolt(560, 60, 76, 0.3)}${bolt(470, 200, 56, 0.05)}${bolt(30, 230, 60, 0.25)}${bolt(640, 230, 50, 0.4)}
<div style="position:absolute;left:36px;top:24px;font-size:16px;font-weight:800;color:#202028;">CAFFEINE</div>
<div style="position:absolute;left:36px;top:50px;width:240px;height:22px;background:#fff;border:4px solid #202028;border-radius:12px;box-sizing:border-box;overflow:hidden;"><div style="height:100%;background:#d03a4a;animation:fill 1.4s linear forwards;"></div></div>
<div style="position:absolute;left:0;right:230px;top:100px;text-align:center;font-size:88px;font-weight:800;color:#d03a4a;line-height:1;text-shadow:5px 5px 0 #202028;opacity:0;animation:pop .5s 1.4s forwards,pulse .3s 1.9s infinite;">ENERGY!!!</div>
<div style="position:absolute;left:250px;top:232px;display:flex;align-items:flex-end;gap:10px;animation:buzz .12s infinite;">
<img src="${SPRITES.ginoFull}" alt="Gino" style="width:104px;height:190px;display:block;">
<img src="${SPRITES.anthonyFull}" alt="Anthony" style="width:104px;height:190px;display:block;">
</div>
${cup(236)}${cup(440)}
`;

const bubble = (side: 'left' | 'right', width: number, delay: number, text: string, tail: number) =>
  `<div style="position:absolute;${side}:24px;top:104px;width:${width}px;background:#fff;border:4px solid #202028;border-radius:16px;padding:12px 16px;box-sizing:border-box;font-size:20px;font-weight:700;line-height:1.35;animation:slidein .4s ${delay}s both;">${text}` +
  `<div style="position:absolute;${side}:${tail}px;bottom:-12px;width:18px;height:18px;background:#fff;border-right:4px solid #202028;border-bottom:4px solid #202028;transform:rotate(45deg);box-sizing:border-box;"></div></div>`;

const PHONE = `
<div style="position:absolute;left:60px;top:230px;"><img src="${SPRITES.ginoBack}" alt="Gino" style="width:150px;height:160px;display:block;"></div>
<div style="position:absolute;right:60px;top:230px;"><img src="${SPRITES.anthonyBack}" alt="Anthony" style="width:150px;height:160px;display:block;"></div>
${bubble('left', 290, 1.2, "Uhh, let's go back to the sessions.", 104)}${bubble('right', 250, 2.6, 'Yeah, good idea.', 90)}
<div style="position:absolute;left:340px;top:14px;width:280px;height:410px;background:#14121a;border-radius:36px;padding:12px;box-sizing:border-box;box-shadow:0 12px 0 #0c0a10;animation:buzz .15s 3;">
<div style="width:100%;height:100%;background:#f4f4f8;border-radius:26px;overflow:hidden;display:flex;flex-direction:column;">
<div style="display:flex;justify-content:space-between;padding:12px 20px 6px;font-size:14px;font-weight:800;"><span>9:41</span><span>5G</span></div>
<div style="display:flex;align-items:center;gap:12px;padding:10px 16px 12px;border-bottom:2px solid #dcdce4;">
<div style="width:40px;height:40px;border-radius:50%;background:#a8305a;color:#fff;font-size:20px;font-weight:800;display:flex;align-items:center;justify-content:center;">B</div>
<div style="font-size:20px;font-weight:800;">Boss</div>
</div>
<div style="flex:1;padding:18px 14px;display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
<div style="font-size:13px;font-weight:700;color:#6a667e;padding-left:6px;">Today 9:41 AM</div>
<div style="max-width:200px;background:#e4e4ec;border-radius:20px 20px 20px 6px;padding:12px 16px;font-size:22px;font-weight:700;line-height:1.3;animation:slidein .4s .5s both;">take lots of notes</div>
</div>
</div>
</div>
`;

export function Restroom() {
  return <div className="scene" style={{ background: '#cfe3e8' }}><Decor html={RESTROOM} /></div>;
}

export function Coffee() {
  return <div className="scene" style={{ background: '#f6c453', animation: 'bgflash .35s infinite' }}><Decor html={COFFEE} /></div>;
}

export function Phone() {
  return <div className="scene" style={{ background: '#3a3650' }}><Decor html={PHONE} /></div>;
}

// Rob gets fired up: lightning, BUILD MODE, screen shake and a white flash.
const zap = (left: number, top: number, w: number, delay: number) =>
  `<div style="position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${Math.round(w * 1.4)}px;background:#e8f6ff;filter:drop-shadow(0 0 6px #8fd0ff);clip-path:polygon(50% 0,100% 0,65% 40%,95% 40%,20% 100%,40% 55%,10% 55%);animation:flash .35s ${delay}s infinite;"></div>`;
const shout = (left: number, delay: number) =>
  `<div style="position:absolute;left:${left}px;top:206px;width:46px;height:40px;border-radius:50%;background:#fff;border:4px solid #202028;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#d03a4a;opacity:0;animation:pop .4s ${delay}s forwards;">!!</div>`;

const ROB = `
<div style="position:absolute;left:0;right:0;top:360px;height:180px;background:#241c34;"></div>
<div style="position:absolute;left:0;right:0;top:356px;height:6px;background:#3a2e50;"></div>
${zap(350, 110, 40, 0)}${zap(586, 80, 46, 0.12)}${zap(330, 250, 34, 0.22)}${zap(606, 230, 38, 0.06)}
<img src="${SPRITES.robPowered}" alt="Rob, arms raised" style="position:absolute;left:400px;top:46px;width:161px;height:330px;display:block;animation:robfloat 1.2s ease-in-out infinite;">
<div style="position:absolute;left:36px;top:24px;font-size:16px;font-weight:800;color:#fff;">POWER PLATFORM LEVEL</div>
<div style="position:absolute;left:36px;top:50px;width:240px;height:22px;background:#fff;border:4px solid #202028;border-radius:12px;box-sizing:border-box;overflow:hidden;"><div style="height:100%;background:linear-gradient(90deg,#ffb020,#ffe066);animation:fill 1.6s linear forwards;"></div></div>
<div style="position:absolute;left:286px;top:44px;font-size:26px;font-weight:800;color:#ffd84a;text-shadow:3px 3px 0 #202028;opacity:0;animation:pop .4s 1.6s forwards;">MAX!</div>
<div style="position:absolute;left:660px;right:20px;top:40px;text-align:center;font-size:52px;line-height:1.05;font-weight:800;color:#ffd84a;text-shadow:4px 4px 0 #202028;opacity:0;animation:pop .5s 1.8s forwards,pulse .5s 2.3s infinite;">BUILD<br>MODE!</div>
<div style="position:absolute;left:40px;top:250px;"><img src="${SPRITES.ginoBack}" alt="Gino" style="width:140px;height:149px;display:block;"></div>
<div style="position:absolute;right:40px;top:250px;"><img src="${SPRITES.anthonyBack}" alt="Anthony" style="width:140px;height:149px;display:block;"></div>
${shout(130, 0.7)}${shout(790, 0.9)}
<div style="position:absolute;inset:0;background:#fff;pointer-events:none;animation:flashout .8s forwards;"></div>
`;

export function RobPowerUp() {
  return (
    <div className="scene" style={{ background: 'radial-gradient(circle at 50% 50%, #2a2244 0%, #1c1430 55%, #0c0a18 100%)', animation: 'buzz .1s 8' }}>
      <Decor html={ROB} />
    </div>
  );
}
