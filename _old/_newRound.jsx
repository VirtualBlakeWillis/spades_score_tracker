function newRoundForTeam({ teamName, roundNumber }) {
  return (
    <>
      {roundNumber > 0 && <div class="teamDivider divider"></div>}
      <div class="teamRoundWrapper" id={`${teamName}round${roundNumber}`}>
        <div class="scoreAndSandbagsWrapper">
          <h2 class="score">0</h2>
          <div class="sandbags">0</div>
        </div>
        <div class="tricksWrapper">
          <div>Bids: </div>
          <div class="tricksBid">0</div>
          <div>Got: </div>
          <div class="tricksGot">final</div>
        </div>
      </div>
    </>
  );
}

export default function appendNewRound({ teamA_name, teamB_name, roundNumber }) {
  // Should update this to add data to gameState, then render data from gameState
  const teamA = document.querySelector(`#${teamA}`);
  teamA.append(newRoundForTeam({ teamName: teamA_name, roundNumber }));
  const teamB = document.querySelector(`#${teamB}`);
  teamB.append(newRoundForTeam({ teamName: teamB_name, roundNumber }));

  /* make middle divider grow */
  const middleDivider = document.getElementById('middleDivider');
  middleDivider.style.height = (parseInt(middleDivider.style.height) + 125) + 'px';
  
}
