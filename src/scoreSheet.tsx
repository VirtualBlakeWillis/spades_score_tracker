import React from "react";

export default function ScoreSheet({ teamA_name, teamB_name }) {
  return (
    <div id="scoreSheet">
      <div id="scoreWrapper">
        <div className="teamWrapper" id="teamA">
          <div className="teamNameMain">
            <h1 className="teamName">{teamA_name}</h1>
          </div>
          <div className="teamDivider divider"></div>
        </div>
        <div
          className="divider"
          id="middleDivider"
          style={{ borderLeft: "5px dashed #000", height: "79px" }}
        />
        <div className="teamWrapper" id="teamB">
          <div className="teamNameMain">
            <h1 className="teamName">{teamB_name}</h1>
          </div>
          <div className="teamDivider divider"></div>
        </div>
      </div>
      <div className="buttonWrapper">
        <button
          className="primaryButton"
          onClick={() => newRoundOverlay({teamA_name, teamB_name})}
        >
          <p className="primaryButtonText">New Round</p>
        </button>
        <button
          className="secondaryButton"
          onClick={endRoundOverlay({teamNameOne: teamA_name, teamNameTwo: teamB_name})}
        >
          <p className="secondaryButtonText">Edit Bids</p>
        </button>
      </div>
    </div>
  );
}
