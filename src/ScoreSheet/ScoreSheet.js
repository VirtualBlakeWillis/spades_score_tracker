import '../styles/new_style.css'
import {newRoundOverlay, endRoundOverlay} from '../scripts/new_script'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { NewRoundForTeam } from './NewRound';

const ScoreSheet = () => {
	const teamNameOne = useSelector(state => state.newGame.teams.team1.name);
	const teamNameTwo = useSelector(state => state.newGame.teams.team2.name);
	const rounds = useSelector(state => state.newGame.rounds.roundList);
	console.log(rounds)

	const toggleNewRoundOverlay = () => {
		document.getElementById('newRoundOverlay').style.display = 'block';
	}


	return (
		<div id="scoreSheet">
			<div id="scoreWrapper">
				<div className="teamWrapper" id="teamOne">
					<div className="teamNameMain">
						<h1 className="teamName">{teamNameOne}</h1>
					</div>
					<div className="teamDivider divider"></div>
					{/* {rounds.map((round) => <NewRoundForTeam teamName="team1" RoundNumber={round.roundNumber}/>)} */}
					<NewRoundForTeam teamName="team1" roundNumber={0} />
				</div>
				<div className="divider" id="middleDivider" style={{ borderLeft: "5px dashed #000", height:79 }}></div>
				<div className="teamWrapper" id="teamTwo">
					<div className="teamNameMain">
						<h1 className="teamName">{teamNameTwo}</h1>
					</div>
					<div className="teamDivider divider"></div>
					<NewRoundForTeam teamName="team2" roundNumber={0} />
				</div>
			</div>
			<div className="buttonWrapper">
				<button className="primaryButton" onClick={toggleNewRoundOverlay}>
					<p className="primaryButtonText">New Round</p>
				</button>
				<button className="secondaryButton" >
				{/* onClick={endRoundOverlay({teamNameOne: {teamNameOne}, teamNameTwo: {teamNameTwo}})} */}
					<p className="secondaryButtonText">Edit Bids</p>
				</button>
			</div>
		</div>
	)
}

export default ScoreSheet;