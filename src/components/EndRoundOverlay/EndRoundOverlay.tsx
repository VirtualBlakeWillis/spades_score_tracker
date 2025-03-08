import React from 'react';
import BidsFinal from "../general/BidsFinal";
import { useGame, useGameDispatch } from "../../GameContext";
import { TeamRound } from '../../types/game';
import { calculateEndOfRoundForTeam } from '../../utils/gameLogic';
import './EndRoundOverlay.css';

interface EndRoundOverlayProps {
  onFinish: () => void;
  toggleEndRoundOverlay: () => void;
}

interface Rules {
  targetScore: number;
  sandbagThreshold: number;
  nilBonus: number;
}

interface EndOfRoundData {
  tricksGot: number;
  nilSuccess: boolean;
}

function isWinner({ team, rules }: { team: TeamRound; rules: Rules }): boolean {
  return team.finalScore !== undefined && team.finalScore >= rules.targetScore;
}

function determineWinner({ teamA, teamB, rules }: { teamA: TeamRound; teamB: TeamRound; rules: Rules }): 'a' | 'b' | 'tie' | null {
  const aWinner = isWinner({ team: teamA, rules });
  const bWinner = isWinner({ team: teamB, rules });

  if (aWinner && bWinner) {
    if (teamA.finalScore! > teamB.finalScore!) return 'a';
    if (teamB.finalScore! > teamA.finalScore!) return 'b';
    return 'tie';
  }
  if (aWinner) return 'a';
  if (bWinner) return 'b';
  return null;
}

export default function EndRoundOverlay({ onFinish, toggleEndRoundOverlay }: EndRoundOverlayProps) {
  const gameState = useGame();
  const dispatch = useGameDispatch();

  const currentRound = gameState.rounds[gameState.rounds.length - 1];
  const aTeamNil = currentRound.aTeam.nil.isNil;
  const bTeamNil = currentRound.bTeam.nil.isNil;
  const aTeamBids = currentRound.aTeam.bid;
  const bTeamBids = currentRound.bTeam.bid;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const aTeamGotsInput = document.querySelector(`#teamA${gameState.rounds.length}final`) as HTMLInputElement;
    const bTeamGotsInput = document.querySelector(`#teamB${gameState.rounds.length}final`) as HTMLInputElement;
    
    if (!aTeamGotsInput?.value || !bTeamGotsInput?.value) {
      throw Error('Missing tricks got values');
    }

    const aTeamGots = parseInt(aTeamGotsInput.value);
    const bTeamGots = parseInt(bTeamGotsInput.value);
    
    const aTeamNilSuccess = aTeamNil
      ? (document.querySelector('#aNilSuccess') as HTMLInputElement)?.checked
      : false;
    const bTeamNilSuccess = bTeamNil
      ? (document.querySelector('#bNilSuccess') as HTMLInputElement)?.checked
      : false;

    const aTeamFinalRound: EndOfRoundData = {
      tricksGot: aTeamGots,
      nilSuccess: aTeamNilSuccess,
    };
    const bTeamFinalRound: EndOfRoundData = {
      tricksGot: bTeamGots,
      nilSuccess: bTeamNilSuccess,
    };

    const rules: Rules = {
      targetScore: gameState.targetScore,
      sandbagThreshold: gameState.sandbagThreshold,
      nilBonus: gameState.nilBonus,
    };

    const aTeamRoundEnd = calculateEndOfRoundForTeam({
      initialRound: currentRound.aTeam,
      endOfRound: aTeamFinalRound,
      rules,
    });

    const bTeamRoundEnd = calculateEndOfRoundForTeam({
      initialRound: currentRound.bTeam,
      endOfRound: bTeamFinalRound,
      rules,
    });

    let winner = null;
    if (isWinner({ team: aTeamRoundEnd, rules }) || isWinner({ team: bTeamRoundEnd, rules })) {
      winner = determineWinner({
        teamA: aTeamRoundEnd,
        teamB: bTeamRoundEnd,
        rules,
      });
    }

    dispatch({
      type: 'addRound',
      payload: {
        aTeam: {
          ...currentRound.aTeam,
          tricks: aTeamGots,
          score: aTeamRoundEnd.score,
          bags: aTeamRoundEnd.bags,
          finalScore: aTeamRoundEnd.finalScore,
          nil: {
            ...currentRound.aTeam.nil,
            success: aTeamNilSuccess
          }
        },
        bTeam: {
          ...currentRound.bTeam,
          tricks: bTeamGots,
          score: bTeamRoundEnd.score,
          bags: bTeamRoundEnd.bags,
          finalScore: bTeamRoundEnd.finalScore,
          nil: {
            ...currentRound.bTeam.nil,
            success: bTeamNilSuccess
          }
        }
      }
    });

    if (winner) {
      dispatch({
        type: 'setWinner',
        payload: winner
      });
    }

    toggleEndRoundOverlay();
  }

  return (
    <div className="end-round-overlay">
      <div className="overlay-wrapper">
        <form onSubmit={onSubmit}>
          <div className="score-wrapper">
            <h1 className="team-name team-name-one">{gameState.aTeamName}</h1>
            <div className="input-wrapper">
              <div className="bids-placed">{aTeamBids}</div>
              <div className="bids-final">
                <BidsFinal teamName="teamA" roundNumber={gameState.rounds.length} />
              </div>
              {aTeamNil && (
                <div className="nil-wrapper">
                  <input type="checkbox" id="aNilSuccess" name="aNilSuccess" />
                  <label htmlFor="aNilSuccess">Nil Success</label>
                </div>
              )}
            </div>
          </div>
          <div className="score-wrapper">
            <h1 className="team-name team-name-two">{gameState.bTeamName}</h1>
            <div className="input-wrapper">
              <div className="bids-placed">{bTeamBids}</div>
              <div className="bids-final">
                <BidsFinal teamName="teamB" roundNumber={gameState.rounds.length} />
              </div>
              {bTeamNil && (
                <div className="nil-wrapper">
                  <input type="checkbox" id="bNilSuccess" name="bNilSuccess" />
                  <label htmlFor="bNilSuccess">Nil Success</label>
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="primary-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
} 