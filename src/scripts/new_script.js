/* imports */



/* popup testing functions */

let affectedByOverlay = ["teamNameMain", "score", "divider"]
let elements = [];
let roundNumber = 0;

let teamNameOne = "teamOne";
let teamNameTwo = "teamTwo";



/* Toggling Overlay */
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



/* creating and updating bids */
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
  function createBidsFinal(teamName, roundNumber) {
    const bidId = teamName + roundNumber + 'final';
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



/* New Round Overlay */
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

function endRoundOverlay() {
    const body = document.querySelector("body");

    const teamOneId = 'teamOneround' + roundNumber;
    const teamTwoId = 'teamTworound' + roundNumber;

    console.log('teamOneId: ' + teamOneId);
    let teamOneBids = document.querySelector(`#${teamOneId} .tricksWrapper .tricksBid`).innerHTML;
    let teamTwoBids = document.querySelector(`#${teamTwoId} .tricksWrapper .tricksBid`).innerHTML;
    teamOneBids = parseInt(teamOneBids);
    teamTwoBids = parseInt(teamTwoBids);

    if (isNaN(teamOneBids) || isNaN(teamTwoBids)) {
        console.log('teamOneBids or teamTwoBids is not a number');
        console.log(`teamOneBids: ${teamOneBids}. teamTwoBids: ${teamTwoBids}`);
    }

    const innerHtml = `
    <div id="endRoundOverlay">
        <div class="overlayWrapper">
            <div class="scoreWrapper">
                <h1 class="teamName teamOneName">${teamNameOne}</h1>
                <div class="inputWrapper">
                    <div class="bidsPlaced">${teamOneBids}</div>
                    <div class="bidsFinal">
                        ${createBidsFinal('teamOne', roundNumber)}
                    </div>
                </div>
            </div>
            <div class="scoreWrapper">
                <h1 class="teamName teamTwoName">${teamNameTwo}</h1>
                <div class="inputWrapper">
                    <div class="bidsPlaced">${teamTwoBids}</div>
                    <div class="bidsFinal">
                    ${createBidsFinal('teamTwo', roundNumber)}
                    </div>
                </div>
            </div>
        </div>
        <button class="primaryButton" onclick="endRoundOverlayOff();">
            <p class="primaryButtonText">Submit</p>
        </button>
    </div>`;
    body.innerHTML += innerHtml;
    overlayOn('endRoundOverlay');
}

function createScoreSheet() {

    const body = document.querySelector("body");

    let innerHTML = `
    <div id="scoreSheet">
        <div id="scoreWrapper">
            <div class="teamWrapper" id="teamOne">
                <h1 class="teamNameMain teamName">${teamNameOne}</h1>
                <div class="teamDivider divider"></div>
            </div>
            <div class="divider" style="border-left:5px dashed #000;height:300px; "></div>
            <div class="teamWrapper" id="teamTwo">
                <h1 class="teamNameMain teamName">${teamNameTwo}</h1>
                <div class="teamDivider divider"></div>
                </h2>
            </div>
        </div>
        <button class="primaryButton" onclick="newRoundOverlay({teamNameOne: '${teamNameOne}', teamNameTwo: '${teamNameTwo}'});">
            <p class="primaryButtonText">New Round</p>
        </button>
        <button class="secondaryButton" onclick="endRoundOverlay({teamNameOne: 'teamOne', teamNameTwo: 'teamTwo'});">
        <p class="secondaryButtonText">Edit Bids</p>
        </button>
    </div>
    `
    /* removed from above for testing */
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

    /* calculate new score */
    calculateNewScore({teamName: 'teamOne'});
    

    /* remove overlay */
    overlayOff('newRoundOverlay');
    let newRoundOverlayElement = document.querySelector('#newRoundOverlay');
    newRoundOverlayElement.parentNode.removeChild(newRoundOverlayElement);
}


function calculateNewScore({teamName = 'unknown'}) {
    if (roundNumber == 1) {
        /* first round, scores will be 0 */
        return
    }
    if (teamName == 'unknown') {
        console.log('error in calculateNewScore, teamName is unknown');
        alert('error in calculateNewScore, teamName is unknown');
        return;
    }


    const roundId = teamName + 'round' + roundNumber;
    const prevRoundId = teamName + 'round' + (roundNumber - 1);

    const bids = document.querySelector(`#${roundId} .tricksBid`).value;
    const gots = document.querySelector(`#${roundId} .tricksGot`).value;

    const prevScoreDiv = document.querySelector(`#${prevRoundId} .score`);
    const newScoreDiv = document.querySelector(`#${roundId} .score`);

    const prevScore = parseInt(prevScoreDiv.innerHTML);

    let newScore;

    /* Verify values are numbers */
    if (isNaN(bids) || isNaN(gots) || isNaN(prevScore)) {
        console.log("error retrieving values");
        console.log('tricksBid: ' + tricksBid);
        console.log('tricksGot: ' + tricksGot);
        console.log('prevScore: ' + prevScore);
        return;
    }

    if (gots >= bids) {
        /* Got required tricks */
        newScore = prevScore + (tricksGot * 10);
        console.log('tricksGotten >= tricksBid');
        console.log('score: ' + newScore);
        newScoreDiv.innerHTML = newScore;

    } else {
        /* Didn't get required tricks */
        newScore = prevScore - (tricksBid * 10);
        console.log('tricksGotten < tricksBid');
        console.log('score: ' + newScore);
        newScoreDiv.innerHTML = newScore;
    }
}




const start = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const targetScore = urlParams.get('targetScore');

    /* update team names globally */
    teamNameOne = urlParams.get('team1');
    teamNameTwo = urlParams.get('team2');

    createScoreSheet();
}
start();