import { createContext, useReducer, useContext } from "react";
export const gameContext = createContext(null);
export const gameDispatchContext = createContext(null);

export function gameReducer(state, action) {
  switch (action.type) {
    case 'setupGame':
      return {
        gameStarted: true,
        aTeamName: action.payload.aTeamName,
        bTeamName: action.payload.bTeamName,
        roundNumber: 0,
        rounds: [],
        rules: {
          targetScore: action.payload.targetScore,
          sandbagThreshold: action.payload.sandbagThreshold,
          nilBonus: action.payload.nilBonus,
        },
      };
    case 'startRound':
      return {
        ...state,
        roundNumber: state.roundNumber + 1,
        rounds: [...state.rounds,
          {
            aTeam: {
              initialScore: state.rounds.length === 0 ? 0 : state.rounds[state.rounds.length - 1].aTeam.finalScore,
              finalScore: undefined,
              bids: action.payload.aTeamBids,
              got: -1,
              sandbags: 0,
              nil: {
                nil: action.payload.aTeamNil,
                blind: action.payload.aTeamBlind,
                nilSuccess: false,
              },
            },
            bTeam: {
              initialScore: state.rounds.length === 0 ? 0 : state.rounds[state.rounds.length - 1].bTeam.finalScore,
              finalScore: undefined,
              bids: action.payload.bTeamBids,
              got: -1,
              sandbags: 0,
              nil: {
                nil: action.payload.bTeamNil,
                blind: action.payload.bTeamBlind,
                nilSuccess: false,
              },
            },
          }
        ]
      };
    case 'endRound':
      return {
        ...state,
        rounds: state.rounds.map((round, index) => {
          if (index === state.roundNumber - 1) {
            return {
              ...round,
              aTeam: {
                ...round.aTeam,
                finalScore: action.payload.aTeamFinalScore,
                got: action.payload.aTeamGot,
                sandbags: action.payload.aTeamSandbags,
                nil: {
                  ...round.aTeam.nil,
                  nilSuccess: action.payload.aTeamNilSuccess,
                },
              },
              bTeam: {
                ...round.bTeam,
                finalScore: action.payload.bTeamFinalScore,
                got: action.payload.bTeamGot,
                sandbags: action.payload.bTeamSandbags,
                nil: {
                  ...round.bTeam.nil,
                  nilSuccess: action.payload.bTeamNilSuccess,
                },
              },
            };
          }
          return round;
        }),
      };
    default:
      throw Error('Invalid action type: ', action.type);
  }
}
const initialGameState = {
  gameStarted: false,
  // aTeamName: "Team A",
  // bTeamName: "Team B",
  // // aTeamScore: 0,
  // // bTeamScore: 0,
  // roundNumber: 1,
  // rounds: [],
  // rules: {
  //   targetScore: 500,
  //   sandbagThreshold: 10,
  // }
  // // roundWinner: undefined,
  // // gameWinner: undefined
}

export function GameProvider({ children }) {
  const [game, dispatch] = useReducer(gameReducer, initialGameState);
  return (
    <gameContext.Provider value={game}>
      <gameDispatchContext.Provider value={dispatch}>
        {children}
      </gameDispatchContext.Provider>
    </gameContext.Provider>
  );
}

export function useGame() {
  const game = useContext(gameContext);
  if (game === null) {
    throw Error('useGame must be used within a GameProvider');
  }
  return game;
}

export function useGameDispatch() {
  const dispatch = useContext(gameDispatchContext);
  if (dispatch === null) {
    throw Error('useGameDispatch must be used within a GameProvider');
  }
  return dispatch;
}