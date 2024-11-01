function newRoundOverlay({ gameState }) {
  const teamA_name = gameState.teamA_name;
  const teamB_name = gameState.teamB_name;
  const roundNumber = gameState.roundNumber;

  // roundNumber++; /* increment round number */

  let body = document.querySelector("body");
  let innerHtml = (
  <div id="newRoundOverlay">
      <div class="overlayWrapper">
          <div class="scoreWrapper">
              <h1 class="teamName teamNameOne">{teamA_name}</h1>
              <div class="bidsWrapper">
                  <div class="inputWrapper">
                      {createEnterBids('teamA', roundNumber, 1)}                     
                      {createEnterBids('teamB', roundNumber, 2)}                     
                  </div>
                  {createBidsTotal('teamA', roundNumber)}
              </div>
          </div>
          <div class="scoreWrapper">
              <h1 class="teamName teamNameTwo">{teamB_name}</h1>
              <div class="bidsWrapper" style="flex-direction: row-reverse;">
                  <div class="inputWrapper">
                  {createEnterBids('teamB', roundNumber, 1)}                     
                  {createEnterBids('teamB', roundNumber, 2)}  
                  </div>
                  {createBidsTotal('teamB', roundNumber)}
              </div>
          </div>
      </div>
      <button class="primaryButton" onClick={createNewRound()}>
          <p class="primaryButtonText">Submit</p>
      </button>
  </div>
  );
  body.append(innerHtml)
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