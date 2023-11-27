/* imports */



/* popup testing functions */

let affectedByOverlay = ["teamNameMain", "score", "divider"]
let elements = [];

function overlayOn(overlayId) {
    document.getElementById(overlayId).style.display = "block";
    for (elements in affectedByOverlay) {
        elements = document.getElementsByClassName(affectedByOverlay[elements]);
        for (x of elements) { x.style.opacity = "0.5"; }
    }
}

function overlayOff(overlayId) {
    document.getElementById(overlayId).style.display = "none";
    for (elements in affectedByOverlay) {
        elements = document.getElementsByClassName(affectedByOverlay[elements]);
        for (x of elements) { x.style.opacity = "1"; }
    }
}



/* Create Bids Input */
function createEnterBids(teamName, roundNumber, bidNumber) {
    const bidId = teamName + roundNumber + bidNumber;
    const bid = `
    <select class="bidInput" id="${bidId}">
        <option selected>bid</option>
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
  function createBidsTotal(teamName, roundNumber) {
      const bidId = teamName + roundNumber + "total";
      const bid = `
      <div class="bidInputTotal" id="${bidId}">total</div>
      `
      return bid;
  }
  function updateBidsTotal(teamName, roundNumber) {
      const bidOneId = teamName + roundNumber + 1;
      const bidTwoId = teamName + roundNumber + 2;
      const bidId = teamName + roundNumber + "total";
      const bidOne = document.querySelector(`#${bidOneId}`).value;
      const bidTwo = document.querySelector(`#${bidTwoId}`).value;
  
      if (bidOne == "bid" || bidTwo == "bid") {
        console.log("missing Bids!");
      } else {
        console.log("updating total");
        const bidTotal = parseInt(bidOne) + parseInt(bidTwo);
        document.querySelector(`#${bidId}`).innerHTML = bidTotal;
        console.log(bidId, document.querySelector(`#${bidId}`));
      }
      console.log(bidOne, bidTwo);
      return bidOne;
  }



/* New Round Overlay */
let roundNumber = 0;
function newRoundOverlay({teamNameOne = 'teamOne', teamNameTwo = 'teamTwo'} = {}) {
    roundNumber++; /* increment round number */
  
    let body = document.querySelector("body");
    let innerHtml = `
    <div id="newRoundOverlay">
        <div class="overlayWrapper">
            <div class="scoreWrapper">
                <h1 class="teamName teamNameOne">${teamNameOne}</h1>
                <div class="bidsWrapper">
                    <div class="inputWrapper">
                        ${createEnterBids('teamOne', roundNumber, 1)}                     
                        ${createEnterBids('teamOne', roundNumber, 2)}                     
                    </div>
                    ${createBidsTotal('teamOne', roundNumber)}
                </div>
            </div>
            <div class="scoreWrapper">
                <h1 class="teamName teamNameTwo">${teamNameTwo}</h1>
                <div class="bidsWrapper" style="flex-direction: row-reverse;">
                    <div class="inputWrapper">
                    ${createEnterBids('teamTwo', roundNumber, 1)}                     
                    ${createEnterBids('teamTwo', roundNumber, 2)}  
                    </div>
                    ${createBidsTotal('teamTwo', roundNumber)}
                </div>
            </div>
        </div>
        <button class="primaryButton" onclick="createNewRound();">
            <p class="primaryButtonText">Submit</p>
        </button>
    </div>
    `
    body.innerHTML += innerHtml;
    overlayOn('newRoundOverlay');
  
    let b1 = document.querySelector(`#teamOne${roundNumber}1`);
    let b2 = document.querySelector(`#teamOne${roundNumber}2`);
    let b3 = document.querySelector(`#teamTwo${roundNumber}1`);
    let b4 = document.querySelector(`#teamTwo${roundNumber}2`);
  
    b1.addEventListener("change", function() { updateBidsTotal('teamOne', roundNumber) });
    b2.addEventListener("change", function() { updateBidsTotal('teamOne', roundNumber) });
    b3.addEventListener("change", function() { updateBidsTotal('teamTwo', roundNumber) });
    b4.addEventListener("change", function() { updateBidsTotal('teamTwo', roundNumber) });
  }


function createScoreSheet({teamNameOne = 'teamOne', teamNameTwo = 'teamTwo'}) {

    const body = document.querySelector("body");

    let innerHTML = `
    <div id="scoreSheet">
        <div id="scoreWrapper">
            <div class="teamWrapper" id="teamOne">
                <h1 class="teamNameMain teamName">${teamNameOne}</h1>
                <div class="teamDivider divider"></div>
                <h2 class="score">0</h2>
            </div>
            <div class="divider" style="border-left:5px dashed #000;height:300px; "></div>
            <div class="teamWrapper" id="teamTwo">
                <h1 class="teamNameMain teamName">${teamNameTwo}</h1>
                <div class="teamDivider divider"></div>
                <h2 class="score">0
                </h2>
            </div>
        </div>
        <button class="primaryButton" onclick="newRoundOverlay({teamNameOne: '${teamNameOne}', teamNameTwo: '${teamNameTwo}'});">
            <p class="primaryButtonText">New Round</p>
        </button>
        <button class="secondaryButton" onclick="createRound({roundNumber: 0});">
            <p class="secondaryButtonText">Edit Bids</p>
        </button>
    </div>
    `
    body.innerHTML += innerHTML;
}

/* need to change this functions name */
function createRound({teamName = 'teamOne', tricksBid = 0} = {}) {
    if (tricksBid <= 0 || isNaN(tricksBid)) {
        console.log('incorrect tricksBid value');
        alert('incorrect tricksBid value');
        return;
    }

    const roundId = teamName + 'round' + roundNumber;
    let html = '';
    if (roundNumber == 0) {
        html = `
        <div class="teamRoundWrapper" id=${roundId}>
            <div class="scoreAndSandbagsWrapper">
                <h2 class="score">0</h2>
                <div class="sandbags">0</div>
            </div>
            <div class="tricksWrapper">
                <div class="tricksBid">${tricksBid}</div>
                <div class="tricksGot">final</div>
            </div>
        </div>
        `;
    } else {
        html = `
        <div class="teamDivider divider"></div>
        <div class="teamRoundWrapper" id=${roundId}>
            <div class="scoreAndSandbagsWrapper">
                <h2 class="score">0</h2>
                <div class="sandbags">0</div>
            </div>
            <div class="tricksWrapper">
                <div class="tricksBid">${tricksBid}</div>
                <div class="tricksGot">final</div>
            </div>
        </div>
        `;
    }
    const teamWrapper = document.querySelector(`#${teamName}`);
    teamWrapper.innerHTML += html;
}
function createNewRound() {
    let teamOneTricks = document.querySelector(`#teamOne${roundNumber}total`).innerHTML;
    let teamTwoTricks = document.querySelector(`#teamTwo${roundNumber}total`).innerHTML;
    createRound({teamName: 'teamOne', tricksBid: teamOneTricks});
    createRound({teamName: 'teamTwo', tricksBid: teamTwoTricks});
    overlayOff('newRoundOverlay');
}


function calculateNewScore({teamName = 'unknown', roundNumber = null}) {
    if (roundNumber == null || roundNumber == 0) {
        console.log('roundNumber not defined or zero');
        return;
    }

    const roundId = teamName + 'round' + roundNumber;
    const prevRoundId = teamName + 'round' + (roundNumber - 1);
    const tricksBid = document.querySelector(`#${roundId} .tricksBid`).value;
    const tricksGot = document.querySelector(`#${roundId} .tricksGot`).value;
    const sandbagsDiv = document.querySelector(`#${roundId} .sandbags`);

    const prevSandbags = document.querySelector(`#${prevRoundId} .sandbags`).innerHTML;
    const prevScoreDiv = document.querySelector(`#${prevRoundId} .score`);
    const newScoreDiv = document.querySelector(`#${roundId} .score`);
    let score = 0;
    let sandbags = 0;

    const prevScore = parseInt(prevScoreDiv.innerHTML);


    /* Verify values are numbers */
    if (isNaN(tricksBid) || isNaN(tricksGot) || isNaN(prevScore)) {
        console.log("error retrieving values");
        console.log('tricksBid: ' + tricksBid);
        console.log('tricksGot: ' + tricksGot);
        console.log('prevScore: ' + prevScore);
        return;
    }

    if (checkTricksGotten(tricksGot, tricksBid)) {
        /* Got required tricks */
        sandbags = tricksGot - tricksBid;
        score = prevScore + (tricksGot * 10) + sandbags;
        console.log('tricksGotten >= tricksBid');
        console.log('score: ' + score);
        newScoreDiv.innerHTML = score;
        sandbagsDiv.innerHTML = sandbags;


    } else {
        /* Didn't get required tricks */
        score = prevScore - (tricksBid * 10);
        console.log('tricksGotten < tricksBid');
        console.log('score: ' + score);
        newScoreDiv.innerHTML = score;
    }
    document.querySelector(`#${roundId} .score`).innerHTML = score;
}

function checkTricksGotten(tricksGot, tricksBid) {
    if (tricksGot >= tricksBid) {
        return true;
    } else {
        return false;
    }
}



const start = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const team1 = urlParams.get('team1');
    const team2 = urlParams.get('team2');
    const targetScore = urlParams.get('targetScore');
    console.log('creating score sheet');
    createScoreSheet({teamNameOne: team1, teamNameTwo: team2});
}
start();