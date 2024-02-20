
/*
function createNewRound() {
    // let teamOneTricks = document.querySelector(`#teamOne${roundNumber}total`).innerHTML;
    // let teamTwoTricks = document.querySelector(`#teamTwo${roundNumber}total`).innerHTML;
    createRound('teamOne');
    createRound('teamTwo');
    scrollToBottom('scoreWrapper');

    /* make middle divider grow */ /*
    const middleDivider = document.getElementById('middleDivider');
    middleDivider.style.height = (parseInt(middleDivider.style.height) + 125) + 'px';

    /* calculate new score */
    // calculateNewScore({teamName: 'teamOne'});
    

    /* remove overlay */ /*
    if (roundNumber > 0) {
    /* update bids */ /*
    displayBids('teamOne');
    displayBids('teamTwo');

    /* remove overlay */ /*
    overlayOff('newRoundOverlay');
    let newRoundOverlayElement = document.querySelector('#newRoundOverlay');
    newRoundOverlayElement.parentNode.removeChild(newRoundOverlayElement);
    }
}
*/
import { useState } from "react";
import { useSelector } from "react-redux";

const NewRoundForTeam = (props) => {
  // const roundNumber = useSelector(state => state.newGame.rounds.currentRound);
  const { teamName, roundNumber } = props;
  console.log(roundNumber);

  const round = useSelector(state => state.newGame.rounds.roundList[roundNumber]);
  console.log(round);


  const roundId = teamName + 'round' + roundNumber;

  const bid = round.bids[teamName].bid;
  const got = round.bids[teamName].got;


  return (
    <div className="teamRoundWrapper" id={roundId}>
      <div className="scoreAndSandbagsWrapper">
          <h2 className="score">0</h2>
          <div className="sandbags">0</div>
      </div>
      <div className="tricksWrapper">
          <div>Bids: </div>
          <div className="tricksBid">{bid || 0}</div>
          <div>Got: </div>
          <div className="tricksGot">{got || 'final'}</div>
      </div>
    </div>
  )
}



export { NewRoundForTeam }