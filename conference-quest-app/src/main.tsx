import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/game.css'
import App from './App.tsx'

// The app runs in a cross-origin frame inside the Power Apps player, so its console can't be seen
// from the player page. Show uncaught errors on the page itself (dismissible). Lesson from Foodie.
const box = document.createElement('div');
box.setAttribute('role', 'alert');
box.style.cssText = 'position:fixed;left:0;right:0;bottom:0;max-height:45vh;overflow:auto;padding:12px;background:#fff;color:#8a0000;border-top:3px solid #8a0000;font:14px/1.4 system-ui,sans-serif;z-index:99999;display:none';
const text = document.createElement('pre');
text.style.cssText = 'white-space:pre-wrap;margin:0 0 8px;font:12px/1.4 monospace';
const close = document.createElement('button');
close.textContent = 'Dismiss error';
close.style.cssText = 'min-height:44px;padding:0 16px;font:inherit';
close.onclick = () => { box.style.display = 'none'; text.textContent = ''; };
box.append(Object.assign(document.createElement('strong'), { textContent: 'App error' }), text, close);
document.body.appendChild(box);

function report(label: string, err: unknown, extra?: string) {
  const e = err instanceof Error ? err : new Error(String(err));
  box.style.display = 'block';
  text.textContent += `${label}: ${e.message}\n${(e.stack ?? '').split('\n').slice(0, 6).join('\n')}${extra ? `\n${extra}` : ''}\n\n`;
}
window.addEventListener('error', (e) => report('Error', e.error ?? e.message));
window.addEventListener('unhandledrejection', (e) => report('Unhandled promise', e.reason));

createRoot(document.getElementById('root')!, {
  onUncaughtError: (err, info) => report('Uncaught render error', err, info.componentStack?.split('\n').slice(0, 8).join('\n')),
  onCaughtError: (err, info) => console.error('Caught by error boundary', err, info.componentStack),
}).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
