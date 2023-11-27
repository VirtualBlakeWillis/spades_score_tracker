/* imports */
import { createEnterBids, createBidsTotal, updateBidsTotal } from "./bids.js";
import { on } from "./toggleOverlay.js";

function createNewRoundOverlay() {
  roundNumber++; /* increment round number */

  let body = document.querySelector("body");
  let innerHtml = `
  <div id="newRoundOverlay">
      <div class="overlayWrapper">
          <div class="scoreWrapper">
              <h1 class="teamName">Team 1</h1>
              <div class="bidsWrapper">
                  <div class="inputWrapper">
                      ${createEnterBids(teamNameOne, roundNumber, 1)}                     
                      ${createEnterBids(teamNameOne, roundNumber, 2)}                     
                  </div>
                  ${createBidsTotal(teamNameOne, roundNumber)}
              </div>
          </div>
          <div class="scoreWrapper">
              <h1 class="teamName">Team 2</h1>
              <div class="bidsWrapper" style="flex-direction: row-reverse;">
                  <div class="inputWrapper">
                  ${createEnterBids(teamNameTwo, roundNumber, 1)}                     
                  ${createEnterBids(teamNameTwo, roundNumber, 2)}  
                  </div>
                  ${createBidsTotal(teamNameTwo, roundNumber)}
              </div>
          </div>
      </div>
      <button class="primaryButton" onclick="off();">
          <p class="primaryButtonText">Submit</p>
      </button>
  </div>
  `
  body.innerHTML += innerHtml;
  on();

  let b1 = document.querySelector(`#${teamNameOne}${roundNumber}1`);
  let b2 = document.querySelector(`#${teamNameOne}${roundNumber}2`);
  let b3 = document.querySelector(`#${teamNameTwo}${roundNumber}1`);
  let b4 = document.querySelector(`#${teamNameTwo}${roundNumber}2`);

  b1.addEventListener("change", function() { updateBidsTotal(teamNameOne, roundNumber) });
  b2.addEventListener("change", function() { updateBidsTotal(teamNameOne, roundNumber) });
  b3.addEventListener("change", function() { updateBidsTotal(teamNameTwo, roundNumber) });
  b4.addEventListener("change", function() { updateBidsTotal(teamNameTwo, roundNumber) });
}

module.exports = {
  createNewRoundOverlay
};