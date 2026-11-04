import { GameContext, useGame, useGameRoot } from './game/useGame';
import { ErrorBoundary } from './ErrorBoundary';
import { DialogBox, Stage, ZoomOverlay } from './scenes/common';
import { Welcome } from './scenes/Welcome';
import { Hallway } from './scenes/Hallway';
import { Classroom, ExpoHall } from './scenes/Classroom';
import { Coffee, Phone, Restroom, RobPowerUp } from './scenes/Extras';

function Screen() {
  const { state } = useGame();
  const s = state.screen;
  return (
    <div className="screen">
      {s === 'welcome' && <Welcome />}
      {s === 'hall' && <Hallway />}
      {s === 'class' && <Classroom />}
      {s === 'expo' && <ExpoHall />}
      {s === 'restroom' && <Restroom />}
      {s === 'coffee' && <Coffee />}
      {s === 'phone' && <Phone />}
      {s === 'rob' && <RobPowerUp />}
      {s !== 'class' && s !== 'expo' && <DialogBox />}
      <ZoomOverlay />
      <div className="wipe" style={{ opacity: state.wipe ? 1 : 0 }} />
    </div>
  );
}

export default function App() {
  const game = useGameRoot();
  return (
    <GameContext.Provider value={game}>
      <Stage>
        <ErrorBoundary onReset={() => game.toStart()}>
          <Screen />
        </ErrorBoundary>
      </Stage>
    </GameContext.Provider>
  );
}
