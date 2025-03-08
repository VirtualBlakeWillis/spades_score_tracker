
import { useGameDispatch } from './GameContext';
import './styles/new_game.css'

export default function NewGame() {
  const dispatch = useGameDispatch();
  function createNewGame(e) {
    // This function should create a new game object
    // and render the new round overlay
    const aTeam = document.getElementById('aTeam').value;
    const bTeam = document.getElementById('bTeam').value;
    const targetScore = document.querySelector('input[name="targetScore"]:checked').value;
    const sandbagPenalty = document.querySelector('input[name="sandbagPenalty"]:checked').value;
    // const game = new Game({
    //   aTeamName: aTeam,
    //   bTeamName: bTeam,
    //   targetScore: targetScore,
    //   sandbagThreshold: sandbagPenalty,
    // });
    // updateGameState(game);
    // updateGameStarted(true);
    e.preventDefault();

    dispatch({
      type: 'setupGame',
      payload: {
        aTeamName: aTeam,
        bTeamName: bTeam,
        targetScore: parseInt(targetScore),
        sandbagThreshold: parseInt(sandbagPenalty),
        nilBonus: parseInt(sandbagPenalty) * 10,
      },
    });
  }
  return (
    <div className="sectionWrapper">
    <h1>New Game!</h1>
    <form onSubmit={createNewGame}>
        <div>
            <label htmlFor="aTeam">Team One:</label>
            <input type="text" id="aTeam" name="aTeam" placeholder="Guys" required />
        </div>
        <div>
            <label htmlFor="bTeam">Team Two:</label>
            <input type="text" id="bTeam" name="bTeam" placeholder="Gals" required />
        </div>
        <div>
            <p style={{display: 'inline-block'}}>Target Score:</p>
            <input type="radio" id="300" name="targetScore" value="300" />
            <label htmlFor="300">300</label>
            <input type="radio" id="500" name="targetScore" value="500" />
            <label htmlFor="500">500</label>
        </div>
        <div>
            <p style={{display: 'inline-block'}}>Sandbag Penalty:</p>
            <input type="radio" id="5" name="sandbagPenalty" value="5" />
            <label htmlFor="5">5</label>
            <input type="radio" id="7" name="sandbagPenalty" value="7" />
            <label htmlFor="7">7</label>
            <input type="radio" id="10" name="sandbagPenalty" value="10" />
            <label htmlFor="10">10</label>
        </div>
        <input type="submit" value="Begin" className="primaryButton" />
    </form>
</div>
  )
}