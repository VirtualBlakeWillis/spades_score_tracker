import appendNewRound from "../newRound";
// import createScoreSheet from "../scoreSheet";
const round = {
  aTeam: {
    bids: 0,
    got: -1,
    sandbags: 0,
    nil: {
      nil: false,
      nilSuccess: false,
    }
  },
  bTeam: {
    bids: 0,
    got: -1,
    sandbags: 0,
    nil: {
      nil: false,
      nilSuccess: false,
    }
  },
}

export default class Game {
  constructor({
    sandbagThreshold = 0,
    targetScore = 0,
    aTeamName = 'Team One',
    bTeamName = 'Team Two',
  }) {
    this.sandbagThreshold = sandbagThreshold;
    this.targetScore = targetScore;
    this.aTeamName = aTeamName;
    this.bTeamName = bTeamName;
    this.roundNumber = 0;
    this.rounds = [];
  }


  startRound() {
    this.roundNumber++;
    // This happens after the overlay is submitted
    appendNewRound({
      teamA_name: this.teamA_name,
      teamB_name: this.teamB_name,
      roundNumber: this.roundNumber,
    });
  }
  endRound() {
    this.rounds.push(round);
  }

  createScoreSheet() {
    const body = document.querySelector("body");
    // body.innerHTML += createScoreSheet({
    //   teamA_name: this.teamA_name,
    //   teamB_name: this.teamB_name,
    // });
  }
}