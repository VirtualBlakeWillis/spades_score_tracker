import BidsFinal from "./components/BidsFinal";
export default function EndRoundOverlay({gameState, updateGameState, onFinish}) {
//   const body = document.querySelector("body");
    const teamNameOne = gameState.aTeamName;
    
    const teamNameTwo = gameState.bTeamName;

    const teamOneBids = 999;
    const teamTwoBids = 999;
    

  // const teamAId = 'teamOneround' + gameState.roundNumber;
  // const teamTwoId = 'teamTworound' + gameState.roundNumber;

  // console.log('teamOneId: ' + teamOneId);
  // let teamOneBids = document.querySelector(`#${teamOneId} .tricksWrapper .tricksBid`).innerHTML;
  // let teamTwoBids = document.querySelector(`#${teamTwoId} .tricksWrapper .tricksBid`).innerHTML;
  // teamOneBids = parseInt(teamOneBids);
  // teamTwoBids = parseInt(teamTwoBids);

  // if (isNaN(teamOneBids) || isNaN(teamTwoBids)) {
  //     console.log('teamOneBids or teamTwoBids is not a number');
  //     console.log(`teamOneBids: ${teamOneBids}. teamTwoBids: ${teamTwoBids}`);
  // }

  return (
  <div id="endRoundOverlay">
      <div class="overlayWrapper">
          <div class="scoreWrapper">
              <h1 class="teamName teamOneName">{teamNameOne}</h1>
              <div class="inputWrapper">
                  <div class="bidsPlaced">{teamOneBids}</div>
                  <div class="bidsFinal">
                      <BidsFinal teamName="teamOne" roundNumber={gameState.roundNumber} />
                  </div>
              </div>
          </div>
          <div class="scoreWrapper">
              <h1 class="teamName teamTwoName">{teamNameTwo}</h1>
              <div class="inputWrapper">
                  <div class="bidsPlaced">{teamTwoBids}</div>
                  <div class="bidsFinal">
                    <BidsFinal teamName="teamTwo" roundNumber={gameState.roundNumber} />
                  </div>
              </div>
          </div>
      </div>
      <button class="primaryButton" onclick="finishRound();">
          <p class="primaryButtonText">Submit</p>
      </button>
  </div>
  );
//   body.append(innerHtml)
//   overlayOn('endRoundOverlay');
}
