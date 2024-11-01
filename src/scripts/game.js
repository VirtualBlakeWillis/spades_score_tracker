import appendNewRound from "../newRound";
import createScoreSheet from "../scoreSheet";
const round = {
  teamA_bids: 0,
  teamA_sandbags: 0,
  teamA_gots: -1,
  nil: {
    teamA_nil: false,
    teamA_nilSuccess: false,
    teamB_nil: false,
    teamB_nilSuccess: false,
  },
  teamB_bids: 0,
  teamB_sandbags: 0,
  teamB_gots: -1,
}

class Game {
  constructor({
    sandbagThreshold = 0,
    targetScore = 0,
    teamA_name = 'Team One',
    teamB_name = 'Team Two',
  }) {
    this.sandbagThreshold = sandbagThreshold;
    this.targetScore = targetScore;
    this.teamA_name = teamA_name;
    this.teamB_name = teamB_name;
    this.roundNumber = 0;
    this.rounds = [];
  }


  createRound() {
    this.roundNumber++;
    // This happens after the overlay is submitted
    appendNewRound({
      teamA_name: this.teamA_name,
      teamB_name: this.teamB_name,
      roundNumber: this.roundNumber,
    });
  }

  createScoreSheet() {
    const body = document.querySelector("body");
    body.innerHTML += createScoreSheet({
      teamA_name: this.teamA_name,
      teamB_name: this.teamB_name,
    });
  }
}