import React from 'react';
import NewGame from "./sections/newGame";
import ScoreSheet from "./sections/scoreSheet";
import { useGame } from './GameContext';

export default function App() {
  const gameState = useGame();

  return (
    <>
      {!gameState.gameStarted ? <NewGame /> : <ScoreSheet />}
    </>
  );
} 