import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rules: {
      targetScore: 500,
      sandbagPenalty: 10,
    },
    teams: {
      team1: {
        name: "teamOne",
        score: 0,
        bags: 0,
        sandbags: 0,
      },
      team2: {
        name: "teamTwo",
        score: 0,
        bags: 0,
        sandbags: 0,
      }
    },
    rounds: {
        currentRound: 1,
        roundList: [{
            roundNumber: 1,
            bids: {
                team1: {
                    bid: 0,
                    got: 0,
                    nil: {
                        bid: false,
                        got: false,
                    }
                },
                team2: {
                    bid: 0,
                    got: 0,
                    nil: {
                        bid: false,
                        got: false,
                    }
                }
            }
        }
        ]
    }
  }

export const newGameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setTargetScore: (state, action) => {
            state.rules.targetScore = action.payload;
        },
        setSandbagPenalty: (state, action) => {
            state.rules.sandbagPenalty = action.payload;
        },
        setTeamName: (state, action) => {
            state.teams[action.payload.team].name = action.payload.name;
        },

        createNewRound: (state) => {
            state.rounds.currentRound++;
            state.rounds.roundList.push({
                roundNumber: state.rounds.currentRound,
                bids: {
                    team1: {
                        bid: 0,
                        got: 0,
                        nil: {
                            bid: false,
                            got: false,
                        }
                    },
                    team2: {
                        bid: 0,
                        got: 0,
                        nil: {
                            bid: false,
                            got: false,
                        }
                    }
                }
            });
        },
        setTotalBids: (state, action) => {
            state.rounds.roundList[state.rounds.currentRound - 1].bids[action.payload.team].bid = action.payload.bid;
        },
    }
});

export const { setTargetScore, setSandbagPenalty, setTeamName, createNewRound, setTotalBids } = newGameSlice.actions;
export default newGameSlice.reducer;