import { createContext, useReducer, useContext, ReactNode, Dispatch } from "react";
import { GameState, GameAction, Round, RoundBids } from "./types/game";

// Create contexts with non-null assertions since we know they'll be provided
const GameContext = createContext<GameState>({} as GameState);
const GameDispatchContext = createContext<Dispatch<GameAction>>({} as Dispatch<GameAction>);

const initialGameState: GameState = {
  aTeamName: "",
  bTeamName: "",
  targetScore: 500,
  sandbagThreshold: 10,
  nilBonus: 100,
  gameStarted: false,
  rounds: []
};

function createNewRound(roundBids: RoundBids, previousRound?: Round): Round {
  const previousATeamScore = previousRound?.aTeam.finalScore ?? 0;
  const previousBTeamScore = previousRound?.bTeam.finalScore ?? 0;

  return {
    aTeam: {
      initialScore: previousATeamScore,
      finalScore: undefined,
      bid: roundBids.aTeam.bids,
      tricks: -1,
      score: 0,
      bags: 0,
      nil: {
        isNil: roundBids.aTeam.isNil,
        isBlind: roundBids.aTeam.isBlind,
        success: false
      }
    },
    bTeam: {
      initialScore: previousBTeamScore,
      finalScore: undefined,
      bid: roundBids.bTeam.bids,
      tricks: -1,
      score: 0,
      bags: 0,
      nil: {
        isNil: roundBids.bTeam.isNil,
        isBlind: roundBids.bTeam.isBlind,
        success: false
      }
    }
  };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'setupGame':
      return {
        ...state,
        ...action.payload,
        gameStarted: true,
        rounds: []
      };

    case 'startRound': {
      const previousRound = state.rounds[state.rounds.length - 1];
      const newRound = createNewRound(action.payload, previousRound);
      return {
        ...state,
        rounds: [...state.rounds, newRound]
      };
    }

    case 'addRound': {
      const updatedRounds = [...state.rounds];
      const currentRoundIndex = updatedRounds.length - 1;
      updatedRounds[currentRoundIndex] = {
        ...updatedRounds[currentRoundIndex],
        ...action.payload
      };
      return {
        ...state,
        rounds: updatedRounds
      };
    }

    case 'setWinner':
      return {
        ...state,
        winner: action.payload
      };

    default:
      return state;
  }
}

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [game, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export function useGame(): GameState {
  const context = useContext(GameContext);
  if (!context || Object.keys(context).length === 0) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

export function useGameDispatch(): Dispatch<GameAction> {
  const context = useContext(GameDispatchContext);
  if (!context) {
    throw new Error("useGameDispatch must be used within a GameProvider");
  }
  return context;
} 