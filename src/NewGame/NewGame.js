import './NewGame.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTargetScore, setSandbagPenalty, setTeamName } from '../reducers/newGameSlice';
import { ScoreSheet } from '../ScoreSheet/ScoreSheet';


const NewGame = () => {
  const dispatch = useDispatch();
  function handleSubmit(event) {
    event.preventDefault()
    const team1 = event.target.team1.value;
    const team2 = event.target.team2.value;
    const targetScore = event.target.targetScore.value;
    const sandbagPenalty = event.target.sandbagPenalty.value;

    dispatch(setTargetScore(targetScore));
    dispatch(setSandbagPenalty(sandbagPenalty));

    dispatch(setTeamName({team: "team1", name: team1}));
    dispatch(setTeamName({team: "team2", name: team2}));

    const scoreSheet = document.getElementById('scoreSheet');
    scoreSheet.style.display = "block";
    const newGame = document.getElementById('newGame');
    newGame.style.display = "none";
    
  }
  return (
    <div className="sectionWrapper" id="newGame">
      <h1>New Game!</h1>
      <form onSubmit={handleSubmit} method="get">
          <div>
              <label htmlFor="team1">Team One:</label>
              <input type="text" id="team1" name="team1" placeholder="Guys" required />
          </div>
          <div>
              <label htmlFor="team2">Team Two:</label>
              <input type="text" id="team2" name="team2" placeholder="Gals" required />
          </div>
          <div>
              <p style={{display: "inline-block"}}>Target Score:</p>
              <input type="radio" id="300" name="targetScore" value="300" />
              <label htmlFor="300">300</label>
              <input type="radio" id="500" name="targetScore" value="500" />
              <label htmlFor="500">500</label>
          </div>
          <div>
              <p style={{display: "inline-block"}}>Sandbag Penalty:</p>
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
};

export default NewGame;