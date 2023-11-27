// Some Variables I will Need
/*
Team1, Team2
Team1Score, Team2Score
currentRound
Team1Round1Bid1, Team1Round1Bid2, Team1Round1BidTotal
Team2Round1Bid1, Team2Round1Bid2, Team2Round1BidTotal
etc...

*/
let roundNumber = 0;
let team1Score = 0;
let team2Score = 0;


function createTeams() {
    const body = document.querySelector("body");
    body.insertAdjacentHTML("afterbegin",`
    <div id="container">
        <div class="teams">
            <input type="text" class="team" name="team1" placeholder="team one">
            <input type="text" class="team" name="team2" placeholder="team two">
        </div>
        <div class="scoring">
            <div class="rounds">
            </div>
        </div>
    </div>
    `);
    return;
}

function createRound(roundNumber) {

    if (typeof roundNumber !== "number" || isNaN(roundNumber)) {
        console.log("variable roundNumber is not a number")
        return;
    }

    const rounds = document.querySelector(".rounds");

    const roundId = "round" + roundNumber;
    const team1bidsId = "team1round" + roundNumber + "bids";
    const team2bidsId = "team2round" + roundNumber + "bids";

    const bidId = 
    rounds.innerHTML += `
    <div class="round" id="${roundId}">
    <div class="team1">
        <div class="bids" id="${team1bidsId}">
            <div id=
            ${createEnterBids("teamOne", roundNumber, 1)}
            ${createEnterBids("teamOne", roundNumber, 2)}
            <div id="total">total</div>
        </div>
        <div class="score">0</div>
    </div>
    <div class="team2">
        <div class="bids" id="${team2bidsId}">
            ${createEnterBids("teamTwo", roundNumber, 1)}
            ${createEnterBids("teamTwo", roundNumber, 2)}
            <div id="total">total</div>
        </div>
        <div class="score">0</div>
    </div>
</div>
    `
}


function totalBids(team, round) {
    id = "team" + team + "round" + round + "bids";
    const bid1 = document.querySelector(`#${id} #bid1`).value;
    const bid2 = document.querySelector(`#${id} #bid2`).value;
    const bid1int = parseInt(bid1);
    const bid2int = parseInt(bid2);
    if (isNaN(bid1int) || isNaN(bid2int)) {
        console.log("Error: Please enter all bids before clicking submit.")
        alert("Please enter all bids before clicking submit.");
        return;
    }
    const total = bid1int + bid2int;

    const totalDiv = document.querySelector(`#${id} #total`);
    totalDiv.innerHTML = total;
    console.log(totalDiv);
}

function createEnterBids(teamNumber, roundNumber, bidNumber) {
    const bidId = teamNumber + roundNumber + bidNumber;
    const bid = `
    <select id="${bidId}">
        <option selected>choose</option>
        <option value="0">nil</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
    </select>
    `
    return bid;
}

function roundEndScreen(roundNumber) {
    const body = document.querySelector("body");
    innerHtml = `
    <div class="teamText" id="roundEndScreen">
        <div>Team One</div>
        <div>Team Two</div>
    </div>
    <div id="bidsContainer">
        ${createEnterBids("teamOne", roundNumber, "final")}
        ${createEnterBids("teamTwo", roundNumber, "final")}
    </div>
    <button onclick="newRound();">Submit</button>
    `
    body.innerHTML += innerHtml;
}

function retrieveBid(bidId) {
    const bid = document.querySelector(`#${bidId}`).value;
    return bid;
}


function onLoad() {
    createTeams();
    createRound(1);
    console.log("loaded");
}
// onLoad();

let affectedByOverlay = ["teamNameMain", "score", "divider"]
let elements = [];
/* New Round Overlay Functions */
function on() {
    document.getElementById("newRoundOverlay").style.display = "block";
    for (elements in affectedByOverlay) {
        elements = document.getElementsByClassName(affectedByOverlay[elements]);
        for (x of elements) { x.style.opacity = "0.5"; }
    }
  }
  
  function off() {
    document.getElementById("newRoundOverlay").style.display = "none";
    for (elements in affectedByOverlay) {
        elements = document.getElementsByClassName(affectedByOverlay[elements]);
        for (x of elements) { x.style.opacity = "1"; }
    }  
}

function endRoundOverlayOn() {
    document.getElementById("endRoundOverlay").style.display = "block";
    for (elements in affectedByOverlay) {
        elements = document.getElementsByClassName(affectedByOverlay[elements]);
        for (x of elements) { x.style.opacity = "0.5"; }
    }
}

function endRoundOverlayOff() {
    document.getElementById("endRoundOverlay").style.display = "none";
    for (elements in affectedByOverlay) {
        elements = document.getElementsByClassName(affectedByOverlay[elements]);
        for (x of elements) { x.style.opacity = "1"; }
    }
}

let roundCounter = 0;

function newRound() {

}