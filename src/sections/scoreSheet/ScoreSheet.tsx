import React, { useState, useEffect } from 'react';
import NewRoundOverlay from '../../components/NewRoundOverlay';
import TeamRoundEntry from '../../components/TeamRoundEntry';
import EndRoundOverlay from '../../components/EndRoundOverlay';
import { useGame } from '../../GameContext';
import './ScoreSheet.css';

export default function ScoreSheet() {
  const gameState = useGame();
  const [newRoundOverlay, setNewRoundOverlay] = useState(false);
  const [endRoundOverlay, setEndRoundOverlay] = useState(false);

  function toggleNewRoundOverlay() {
    setNewRoundOverlay(!newRoundOverlay);
  }

  function toggleEndRoundOverlay() {
    setEndRoundOverlay(!endRoundOverlay);
  }

  useEffect(() => {
    if (gameState.winner) {
      setEndRoundOverlay(false);
    }
  }, [gameState]);

  const handleRoundFinish = () => {
    toggleEndRoundOverlay();
  };

  return (
    <div id="scoreSheet">
      <div id="scoreWrapper">
        <div className="teamWrapper" id="teamA">
          <div className="teamNameMain">
            <h1 className="teamName">{gameState.aTeamName}</h1>
          </div>
          <div className="teamDivider divider"></div>
          {gameState.rounds.map((round, index) => (
            <TeamRoundEntry
              key={index}
              teamName="teamA"
              teamRound={round.aTeam}
              roundNumber={index + 1}
            />
          ))}
        </div>
        <div
          className="divider"
          id="middleDivider"
          style={{ borderLeft: "5px dashed #000", height: "79px" }}
        />
        <div className="teamWrapper" id="teamB">
          <div className="teamNameMain">
            <h1 className="teamName">{gameState.bTeamName}</h1>
          </div>
          <div className="teamDivider divider"></div>
          {gameState.rounds.map((round, index) => (
            <TeamRoundEntry
              key={index}
              teamName="teamB"
              teamRound={round.bTeam}
              roundNumber={index + 1}
            />
          ))}
        </div>
      </div>
      <div className="buttonWrapper">
        <button className="primaryButton" onClick={toggleNewRoundOverlay}>
          <p className="primaryButtonText">New Round</p>
        </button>
        <button className="secondaryButton" onClick={toggleEndRoundOverlay}>
          <p className="secondaryButtonText">End Round</p>
        </button>
      </div>
      {newRoundOverlay && <NewRoundOverlay toggleNewRoundOverlay={toggleNewRoundOverlay} />}
      {endRoundOverlay && (
        <EndRoundOverlay 
          toggleEndRoundOverlay={toggleEndRoundOverlay}
          onFinish={handleRoundFinish}
        />
      )}
    </div>
  );
} 