export default function TeamRoundEntry({thisTeam, teamRound, roundNumber}) {
  return (
    <div className="teamRoundWrapper" id={`${thisTeam}round${roundNumber}`}>
                <div className="scoreAndSandbagsWrapper">
                  <h2 className="score">{teamRound.finalScore ? teamRound.finalScore : teamRound.initialScore}</h2>
                  <div className="sandbags">{teamRound.sandbags}</div>
                </div>
                <div className="tricksWrapper">
                  <div>Bids: </div>
                  <div className="tricksBid">{teamRound.bids}</div>
                  <div>Got: </div>
                  <div className="tricksGot">{teamRound.gots >= 0 ? teamRound.gots : 'final'}</div>
                </div>
              </div>
  )
}