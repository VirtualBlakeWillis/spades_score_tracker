
class TeamInRound {
    constructor() {
        this.bids = 0;
        this.gots = 0;
        this.oldScore = 0;
        this.newScore = 0;
    }

    /* Getters */
    getBids() { return this.bids; }
    getGots() { return this.gots; }
    getOldScore() { return this.oldScore; }
    getNewScore() { return this.newScore; }

    /* Setters */
    setBids(bids) { this.bids = bids; }
    setGots(gots) { this.gots = gots; }
    setOldScore(oldScore) { this.oldScore = oldScore; }
    setNewScore(newScore) { this.newScore = newScore; }
}

class Round {
    constructor(roundNumber) {
        this.roundNumber = roundNumber;
        this.teamOne = new TeamInRound();
        this.teamTwo = new TeamInRound();

        /* getters */
        this.getRoundNumber = () => { return this.roundNumber; }
        this.getTeamOne = () => { return this.teamOne; }
        this.getTeamTwo = () => { return this.teamTwo; }
    }
}

class Game {
    constructor(teamOneName, teamTwoName) {
        this.teamOneName = teamOneName;
        this.teamTwoName = teamTwoName;
        this.rounds = [];
        this.currentRound = 0;
    }

    /* Getters */
    getTeamOneName() { return this.teamOneName; }
    getTeamTwoName() { return this.teamTwoName; }

    /* Setters */
    setTeamOneName(teamOneName) { this.teamOneName = teamOneName; }
    setTeamTwoName(teamTwoName) { this.teamTwoName = teamTwoName; }


    incrementRound() {
        this.currentRound++;
    }
    /* Methods */
    newRound() {
        this.incrementRound();
        this.rounds.push(new Round(this.currentRound));
    }

    setNewBids(teamOneBids, teamTwoBids) {
        this.rounds[this.currentRound - 1].getTeamOne().setBids(teamOneBids);
        this.rounds[this.currentRound - 1].getTeamTwo().setBids(teamTwoBids);
    }
}