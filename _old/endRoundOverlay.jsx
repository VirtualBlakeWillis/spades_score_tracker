import BidsFinal from "./components/BidsFinal";
import { useGame, useGameDispatch } from "./GameContext";
import { calculateEndOfRoundForTeam } from "./scripts/logic";

function isWinner({ team, rules }) {
    if (team.finalScore >= rules.targetScore) return true;
    return false;
  }
  
  function determineWinner({ teamA, teamB, rules }) {
    const aWinner = isWinner({ team: teamA, rules });
    const bWinner = isWinner({ team: teamB, rules });
    if (aWinner && bWinner) {
      if (teamA.finalScore > teamB.finalScore) return 'a';
      if (teamB.finalScore > teamA.finalScore) return 'b';
      return 'tie';
    }
    if (aWinner) return 'a';
    if (bWinner) return 'b';
    return null;
  }
  
export default function EndRoundOverlay({ onFinish, toggleEndRoundOverlay}) {
    const gameState = useGame();
    const dispatch = useGameDispatch();
//   const body = document.querySelector("body");
    const teamNameOne = gameState.aTeamName
    const teamNameTwo = gameState.bTeamName;

    const aNil = gameState.rounds[gameState.roundNumber - 1].aTeam.nil.nil;
    const bNil = gameState.rounds[gameState.roundNumber - 1].bTeam.nil.nil;

    // const teamOneBids = 999;
    const teamOneBids = gameState.rounds[gameState.roundNumber - 1].aTeam.bids;
    const teamTwoBids = gameState.rounds[gameState.roundNumber - 1].bTeam.bids;

    function onSubmit(e) {
        e.preventDefault();
        const teamOneGotsString = document.querySelector(`#teamOne${gameState.roundNumber}final`).value;
        if (!teamOneGotsString) {
            throw Error('teamOneGotsString is not defined');
        }
        const teamOneGots = parseInt(teamOneGotsString);
        const aNilSuccess = aNil
            ? document.querySelector(`#aNilSuccess`).checked
            : false;
        const teamTwoGotsString = document.querySelector(`#teamTwo${gameState.roundNumber}final`).value;
        if (!teamTwoGotsString) {
            throw Error('teamTwoGotsString is not defined');
        }
        const teamTwoGots = parseInt(teamTwoGotsString);
        const bNilSuccess = bNil
            ? document.querySelector(`#bNilSuccess`).checked
            : false;
        const teamOneFinalRound = {
            tricksGot: teamOneGots,
            nilSuccess: aNilSuccess,
        }
        const teamTwoFinalRound = {
            tricksGot: teamTwoGots,
            nilSuccess: bNilSuccess,
        }

        const teamOneRoundEnd = calculateEndOfRoundForTeam({
            initialRound: gameState.rounds[gameState.roundNumber - 1].aTeam,
            endOfRound: teamOneFinalRound,
            rules: gameState.rules,
        });
        console.log('teamOneRoundEnd: ', teamOneRoundEnd);
        const teamTwoRoundEnd = calculateEndOfRoundForTeam({
            initialRound: gameState.rounds[gameState.roundNumber - 1].bTeam,
            endOfRound: teamTwoFinalRound,
            rules: gameState.rules,
        })
        let winner = null;
        if (isWinner({ team: teamOneRoundEnd, rules: gameState.rules }) || 
            isWinner({ team: teamTwoRoundEnd, rules: gameState.rules })) {
            winner = determineWinner({
                teamA: teamOneRoundEnd,
                teamB: teamTwoRoundEnd,
                rules: gameState.rules,
            });
        }
        dispatch({
            type: 'endRound',
            payload: {
                aTeamFinalScore: teamOneRoundEnd.finalScore,
                aTeamGot: teamOneGots,
                aTeamSandbags: teamOneRoundEnd.sandbags,
                aTeamNilSuccess: aNilSuccess,
                bTeamFinalScore: teamTwoRoundEnd.finalScore,
                bTeamGot: teamTwoGots,
                bTeamSandbags: teamTwoRoundEnd.sandbags,
                bTeamNilSuccess: bNilSuccess,
            },
        });

        if (winner) {
            dispatch({
                type: 'endGame',
                payload: {
                    winner,
                },
            });
        }
        toggleEndRoundOverlay();
        // const teamTwoRoundEnd = calculateEndOfRoundForTeam(gameState.rounds[gameState.roundNumber - 1].bTeam);
    }
    

  // const teamAId = 'teamOneround' + gameState.roundNumber;
  // const teamTwoId = 'teamTworound' + gameState.roundNumber;

  // console.log('teamOneId: ' + teamOneId);
  // let teamOneBids = document.querySelector(`#${teamOneId} .tricksWrapper .tricksBid`).innerHTML;
  // let teamTwoBids = document.querySelector(`#${teamTwoId} .tricksWrapper .tricksBid`).innerHTML;
  // teamOneBids = parseInt(teamOneBids);
  // teamTwoBids = parseInt(teamTwoBids);

  // if (isNaN(teamOneBids) || isNaN(teamTwoBids)) {
  //     console.log('teamOneBids or teamTwoBids is not a number');
  //     console.log(`teamOneBids: ${teamOneBids}. teamTwoBids: ${teamTwoBids}`);
  // }

//   return (
//     <div id="endRoundOverlay" className="overlayWrapper">
//         <form action={onSubmit}>
//             <div className="scoreWrapper">
//                 <h3>{teamNameOne}</h3>

//             </div>
//         </form>

//     </div>
//   )

  return (
  <div id="endRoundOverlay">
      <div className="overlayWrapper">
      <form onSubmit={onSubmit}>
          <div className="scoreWrapper">
              <h1 className="teamName teamOneName">{teamNameOne}</h1>
              <div className="inputWrapper">
                  <div className="bidsPlaced">{teamOneBids}</div>
                  <div className="bidsFinal">
                      <BidsFinal teamName="teamOne" roundNumber={gameState.roundNumber}/>
                  </div>
                  {/* nil */}
                  {aNil && (
                        <div className="nilWrapper">
                            <input type="checkbox" id="aNilSuccess" name="aNilSuccess" />
                            <label htmlFor="aNilSuccess">Nil Success</label>
                        </div>
                  )}
              </div>
          </div>
          <div className="scoreWrapper">
              <h1 className="teamName teamTwoName">{teamNameTwo}</h1>
              <div className="inputWrapper">
                  <div className="bidsPlaced">{teamTwoBids}</div>
                  <div className="bidsFinal">
                    <BidsFinal teamName="teamTwo" roundNumber={gameState.roundNumber}/>
                  </div>
                  {bNil && (
                        <div className="nilWrapper">
                            <input type="checkbox" id="bNilSuccess" name="bNilSuccess" />
                            <label htmlFor="bNilSuccess">Nil Success</label>
                        </div>
                  )}
              </div>
          </div>
          <button className="primaryButton" type="submit">
                Submit
            </button>
        </form>
      </div>
  </div>
  );
//   body.append(innerHtml)
//   overlayOn('endRoundOverlay');
}
