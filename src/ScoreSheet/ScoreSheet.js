import '../styles/new_style.css'
import {newRoundOverlay, endRoundOverlay} from '../scripts/new_script'
const teamNameOne = "teamNameOne";
const teamNameTwo = "teamNameTwo";

const ScoreSheet = () => {
	return (
		<div id="scoreSheet">
			<div id="scoreWrapper">
				<div className="teamWrapper" id="teamOne">
					<div className="teamNameMain">
						<h1 className="teamName">{teamNameOne}</h1>
					</div>
					<div className="teamDivider divider"></div>
				</div>
				<div className="divider" id="middleDivider" style={{ borderLeft: "5px dashed #000", height:79 }}></div>
				<div className="teamWrapper" id="teamTwo">
					<div className="teamNameMain">
						<h1 className="teamName">{teamNameTwo}</h1>
					</div>
					<div className="teamDivider divider"></div>
				</div>
			</div>
			<div className="buttonWrapper">
				<button className="primaryButton">
				{/* onClick={newRoundOverlay({teamNameOne: {teamNameOne}, teamNameTwo: {teamNameTwo}})}> */}
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