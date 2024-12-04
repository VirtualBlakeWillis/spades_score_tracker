import EnterBids from "./components/EnterBids";
import BidsTotal from "./components/BidsTotal";
import './styles/new_style.css'

import { useGame, useGameDispatch } from "./GameContext";

export default function  NewRoundOverlay({toggleNewRoundOverlay}) {
  const gameState = useGame();
  const dispatch = useGameDispatch();
    const aTeamName = gameState.aTeamName;
    const bTeamName = gameState.bTeamName;
    const roundNumber = gameState.roundNumber;
//   const roundNumber = gameState.roundNumber;
  // roundNumber++; /* increment round number */

  function createNewRound() {
    
    const aTeamBidIds = [`teamA${roundNumber}1`, `teamA${roundNumber}2`];
    const bTeamBidIds = [`teamB${roundNumber}1`, `teamB${roundNumber}2`];
    const aTeamBids = aTeamBidIds.map(id => document.querySelector(`#${id}`).value);
    const bTeamBids = bTeamBidIds.map(id => document.querySelector(`#${id}`).value);
    const aTeamNil = aTeamBids.includes('0');
    const bTeamNil = bTeamBids.includes('0');
    let aTeamBlind = false;
    let bTeamBlind = false;
    if (aTeamNil) {
      aTeamBlind = document.querySelector(`#teamA${roundNumber}nil`).checked;
    }
    if (bTeamNil) {
      bTeamBlind = document.querySelector(`#teamB${roundNumber}nil`).checked;
    }


    const aTeamTotal = aTeamBids.reduce((acc, bid) => acc + parseInt(bid), 0);
    const bTeamTotal = bTeamBids.reduce((acc, bid) => acc + parseInt(bid), 0);
    dispatch({
      type: 'startRound',
      payload: {
        aTeamBids: aTeamTotal,
        aTeamNil,
        aTeamBlind,
        bTeamBids: bTeamTotal,
        bTeamNil,
        bTeamBlind,
      },
    });
    toggleNewRoundOverlay();
  }

  function updateBidsTotal(teamName, roundNumber) {

    const bidId = teamName + roundNumber + "total";


    const bidOneId = teamName + roundNumber + 1;
    const bidTwoId = teamName + roundNumber + 2;
    const bidOne = document.querySelector(`#${bidOneId}`).value;
    const bidTwo = document.querySelector(`#${bidTwoId}`).value;
    console.log(bidOne, bidTwo);
    if (bidOne === '-1' || bidTwo === '-1') {
      console.log("missing Bids!");
      document.querySelector(`#${bidId}`).innerHTML = 'total';
    } else {
      console.log("updating total");
      const bidTotal = parseInt(bidOne) + parseInt(bidTwo);

      document.querySelector(`#${bidId}`).innerHTML = bidTotal;
      // console.log(bidId, document.querySelector(`#${bidId}`));
    }
  //   console.log(bidOne, bidTwo);
    return bidOne;
  }



  return (
    <div id="newRoundOverlay">
        <div className="overlayWrapper">
            <div className="scoreWrapper">
                <h1 className="teamName teamNameOne">{aTeamName}</h1>
                <div className="bidsWrapper">
                    <div className="inputWrapper">
                      <EnterBids teamName="teamA" roundNumber={roundNumber} bidNumber={1} onChange={() => updateBidsTotal('teamA', roundNumber)}/>
                      <EnterBids teamName="teamA" roundNumber={roundNumber} bidNumber={2} onChange={() => updateBidsTotal('teamA', roundNumber)}/>                   
                    </div>
                      <BidsTotal teamName="teamA" roundNumber={roundNumber} />
                </div>
            </div>
            <div className="scoreWrapper">
                <h1 className="teamName teamNameTwo">{bTeamName}</h1>
                <div className="bidsWrapper" style={{flexDirection: 'row-reverse'}}>
                    <div className="inputWrapper">
                      <EnterBids teamName="teamB" roundNumber={roundNumber} bidNumber={1} onChange={() => updateBidsTotal('teamB', roundNumber)}/>
                      <EnterBids teamName="teamB" roundNumber={roundNumber} bidNumber={2} onChange={() => updateBidsTotal('teamB', roundNumber)}/> 
                    </div>
                  <BidsTotal teamName="teamB" roundNumber={roundNumber} />
                </div>
            </div>
        </div>
        <button className="primaryButton" onClick={() => createNewRound()}>
            <p className="primaryButtonText">Submit</p>
        </button>
    </div>
  );
  // overlayOn('newRoundOverlay');

//   let b1 = document.querySelector(`#teamOne${roundNumber}1`);
//   let b2 = document.querySelector(`#teamOne${roundNumber}2`);
//   let b3 = document.querySelector(`#teamTwo${roundNumber}1`);
//   let b4 = document.querySelector(`#teamTwo${roundNumber}2`);

//   b1.addEventListener("change", function() { updateBidsTotal('teamOne', roundNumber) });
//   b2.addEventListener("change", function() { updateBidsTotal('teamOne', roundNumber) });
//   b3.addEventListener("change", function() { updateBidsTotal('teamTwo', roundNumber) });
//   b4.addEventListener("change", function() { updateBidsTotal('teamTwo', roundNumber) });
}
