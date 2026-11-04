import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { Game } from './game';
import type { Key } from './game';

export const GameContext = createContext<Game | null>(null);

const KEYS: Record<string, Key> = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  Enter: 'A', z: 'A', Z: 'A', ' ': 'A', x: 'B', X: 'B', Escape: 'B', Backspace: 'B',
};

// Creates the game once, starts the dialog typewriter, and wires the keyboard (arrows, Enter/Z = A, Esc/X = B).
export function useGameRoot(): Game {
  const [game] = useState(() => new Game());
  useEffect(() => {
    game.start();
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = KEYS[e.key];
      if (k) { e.preventDefault(); game.press(k); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); game.stop(); };
  }, [game]);
  return game;
}

export function useGame() {
  const game = useContext(GameContext);
  if (!game) throw new Error('useGame must be used inside GameContext');
  const state = useSyncExternalStore(game.subscribe, game.getState);
  return { game, state };
}
