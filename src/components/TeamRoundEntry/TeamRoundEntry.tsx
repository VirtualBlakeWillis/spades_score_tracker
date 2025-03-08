import { TeamRound } from '../../types/game';
import './TeamRoundEntry.css';

interface TeamRoundEntryProps {
  teamName: string;
  teamRound: TeamRound;
  roundNumber: number;
}

export default function TeamRoundEntry({ teamName, teamRound, roundNumber }: TeamRoundEntryProps) {
  const displayScore = teamRound.finalScore ?? teamRound.initialScore;
  const displayTricks = teamRound.tricks >= 0 ? teamRound.tricks : 'final';
  
  return (
    <div className="team-round-wrapper" id={`${teamName}round${roundNumber}`}>
      <div className="score-and-sandbags-wrapper">
        <h2 className="score">{displayScore}</h2>
        <div className="sandbags">{teamRound.bags}</div>
      </div>
      <div className="tricks-wrapper">
        <div className="bid-section">
          <div>Bid: </div>
          <div className="tricks-bid">
            {teamRound.nil.isNil ? (
              <span>Nil{teamRound.nil.isBlind ? ' (Blind)' : ''}</span>
            ) : (
              teamRound.bid
            )}
          </div>
        </div>
        <div className="got-section">
          <div>Got: </div>
          <div className="tricks-got">{displayTricks}</div>
        </div>
      </div>
    </div>
  );
} 