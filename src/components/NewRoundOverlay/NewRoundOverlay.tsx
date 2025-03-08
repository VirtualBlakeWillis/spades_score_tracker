import React from 'react';
import EnterBids from "../general/EnterBids";
import BidsTotal from "../general/BidsTotal";
import { useGame, useGameDispatch } from "../../GameContext";
import { RoundBids } from "../../types/game";
import '../../styles/overlayBase.css';
import './NewRoundOverlay.css';

interface NewRoundOverlayProps {
  toggleNewRoundOverlay: () => void;
}

export default function NewRoundOverlay({ toggleNewRoundOverlay }: NewRoundOverlayProps) {
  const gameState = useGame();
  const dispatch = useGameDispatch();
  const aTeamName = gameState.aTeamName;
  const bTeamName = gameState.bTeamName;
  const roundNumber = gameState.rounds.length + 1;

  function createNewRound() {
    const aTeamBidIds = [`teamA${roundNumber}1`, `teamA${roundNumber}2`];
    const bTeamBidIds = [`teamB${roundNumber}1`, `teamB${roundNumber}2`];
    const aTeamBids = aTeamBidIds.map(id => (document.querySelector(`#${id}`) as HTMLInputElement)?.value);
    const bTeamBids = bTeamBidIds.map(id => (document.querySelector(`#${id}`) as HTMLInputElement)?.value);
    
    const aTeamNil = aTeamBids.includes('0');
    const bTeamNil = bTeamBids.includes('0');
    
    let aTeamBlind = false;
    let bTeamBlind = false;
    
    if (aTeamNil) {
      aTeamBlind = (document.querySelector(`#teamA${roundNumber}nil`) as HTMLInputElement)?.checked || false;
    }
    if (bTeamNil) {
      bTeamBlind = (document.querySelector(`#teamB${roundNumber}nil`) as HTMLInputElement)?.checked || false;
    }

    const aTeamTotal = aTeamBids.reduce((acc, bid) => acc + parseInt(bid), 0);
    const bTeamTotal = bTeamBids.reduce((acc, bid) => acc + parseInt(bid), 0);
    
    const roundBids: RoundBids = {
      aTeam: {
        bids: aTeamTotal,
        isNil: aTeamNil,
        isBlind: aTeamBlind
      },
      bTeam: {
        bids: bTeamTotal,
        isNil: bTeamNil,
        isBlind: bTeamBlind
      }
    };

    dispatch({
      type: 'startRound',
      payload: roundBids
    });
    
    toggleNewRoundOverlay();
  }

  function updateBidsTotal(teamName: string, roundNumber: number) {
    const idPrefix = teamName + roundNumber;
    const bidId = idPrefix + "total";
    const bidOneId = idPrefix + "1";
    const bidTwoId = idPrefix + "2";
    
    const bidOne = (document.querySelector(`#${bidOneId}`) as HTMLInputElement)?.value;
    const bidTwo = (document.querySelector(`#${bidTwoId}`) as HTMLInputElement)?.value;
    
    const totalElement = document.querySelector(`#${bidId}`);
    if (!totalElement) return;

    if (bidOne === '-1' || bidTwo === '-1') {
      totalElement.innerHTML = '<span>Total</span>total';
    } else {
      const bidTotal = parseInt(bidOne) + parseInt(bidTwo);
      totalElement.innerHTML = `<span>Total</span>${bidTotal}`;
    }
  }

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-header">
          <h2 className="overlay-title">New Round</h2>
        </div>
        
        <div className="teams-container">
          <div className="team-section">
            <h3 className="team-name">{aTeamName}</h3>
            <div className="bids-wrapper">
              <div className="input-wrapper">
                <EnterBids 
                  teamName="teamA" 
                  roundNumber={roundNumber} 
                  bidNumber={1} 
                  onChange={() => updateBidsTotal('teamA', roundNumber)}
                />
                <EnterBids 
                  teamName="teamA" 
                  roundNumber={roundNumber} 
                  bidNumber={2} 
                  onChange={() => updateBidsTotal('teamA', roundNumber)}
                />
              </div>
              <BidsTotal teamName="teamA" roundNumber={roundNumber} />
            </div>
          </div>

          <div className="team-section">
            <h3 className="team-name">{bTeamName}</h3>
            <div className="bids-wrapper reverse">
              <div className="input-wrapper">
                <EnterBids 
                  teamName="teamB" 
                  roundNumber={roundNumber} 
                  bidNumber={1} 
                  onChange={() => updateBidsTotal('teamB', roundNumber)}
                />
                <EnterBids 
                  teamName="teamB" 
                  roundNumber={roundNumber} 
                  bidNumber={2} 
                  onChange={() => updateBidsTotal('teamB', roundNumber)}
                />
              </div>
              <BidsTotal teamName="teamB" roundNumber={roundNumber} />
            </div>
          </div>
        </div>

        <div className="overlay-footer">
          <button className="primary-button" onClick={createNewRound}>
            Start Round
          </button>
        </div>
      </div>
    </div>
  );
} 