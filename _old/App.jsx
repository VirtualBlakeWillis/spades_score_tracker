import { useCallback, useState } from "react"
import NewGame from "./sections/newGame"
import ScoreSheet from "./sections/scoreSheet";
import { GameProvider, useGame } from './GameContext';

export default function App() {
  // const [game, dispatch] = useReducer(gameReducer, initialGameState);

  // const [gameStarted, setGameStarted] = useState(false);
  // const [gameState, setGameState] = useState(undefined);
  const gameState = useGame();

  // const updateGameState = useCallback((gameState) => {
  //   setGameState(gameState);
  // }, []);
  return (
    <>
        {!gameState.gameStarted
          ? <NewGame />
          : <ScoreSheet/>
        }
    </>
  )
}