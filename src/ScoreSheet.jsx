import React from "react";
import NewRoundOverlay from "./newRoundOverlay";
import TeamRoundEntry from "./TeamRoundEntry";
import { useState } from "react";
// import EndRoundOverlay from "./endRoundOverlay";

import { useGame } from "./GameContext";
import './styles/new_style.css'

export default function ScoreSheet() {
  const gameState = useGame();
  const [newRoundOverlay, setNewRoundOverlay] = useState(false);
  // const [endRoundOverlay, setEndRoundOverlay] = useState(false);

  function toggleNewRoundOverlay() {
    setNewRoundOverlay(!newRoundOverlay);
  }
  // function endRound() {
  //   setEndRoundOverlay(true);
  // }
  return (
    <div id="scoreSheet">
      <div id="scoreWrapper">
        <div className="teamWrapper" id="teamA">
          <div className="teamNameMain">
            <h1 className="teamName">{gameState.aTeamName}</h1>
          </div>
          <div className="teamDivider divider"></div>
          {gameState.rounds.map((round, index) => {
            return (
              <TeamRoundEntry
                thisTeam="teamA"
                teamRound={round.aTeam}
                roundNumber={index + 1}
              />
            );
          })}
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
          {gameState.rounds.map((round, index) => {
            return (
              <TeamRoundEntry
                thisTeam="teamB"
                teamRound={round.bTeam}
                roundNumber={index + 1}
              />
            );
          })}
        </div>
      </div>
      <div className="buttonWrapper">
        <button
          className="primaryButton"
          onClick={() => toggleNewRoundOverlay()}
        >
          <p className="primaryButtonText">New Round</p>
        </button>
        <button
          className="secondaryButton"
          // onClick={() => endRound()}
        >
          <p className="secondaryButtonText">End Round</p>
        </button>
      </div>
      {/* <div className="overlays"> */}
        { newRoundOverlay && <NewRoundOverlay toggleNewRoundOverlay={toggleNewRoundOverlay}/> }
        {/* {endRoundOverlay && <EndRoundOverlay />} */}
      {/* </div> */}
    </div>
  );
}
