export default function gameReducer(state, action) {
  switch (action.type) {
    case 'setupGame':
      return {
        aTeamName: action.payload.aTeamName,
        bTeamName: action.payload.bTeamName,
        roundNumber: 1,
        rounds: [],
        rules: {
          targetScore: action.payload.targetScore,
          sandbagThreshold: action.payload.sandbagThreshold,
        },
      };
    case 'startRound':
      return {
        ...state,
        roundNumber: state.roundNumber + 1,
        rounds: state.rounds.push({
          aTeam: {
            bids: action.payload.aTeamBids,
            got: -1,
            sandbags: 0,
            nil: {
              nil: action.payload.aTeamNil,
              nilSuccess: false,
            },
          },
          bTeam: {
            bids: action.payload.bTeamBids,
            got: -1,
            sandbags: 0,
            nil: {
              nil: action.payload.bTeamNil,
              nilSuccess: false,
            },
          },
        }),
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
                got: action.payload.aTeamGot,
                sandbags: action.payload.aTeamSandbags,
                nil: {
                  ...round.aTeam.nil,
                  nilSuccess: action.payload.aTeamNilSuccess,
                },
              },
              bTeam: {
                ...round.bTeam,
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