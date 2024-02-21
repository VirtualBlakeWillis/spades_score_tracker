import { useSelector, useDispatch } from "react-redux";
import { createNewRound, setTotalBids } from "../reducers/newGameSlice";
import CreateEnterBids from "../EnterBids/EnterBids";
import CreateBidsTotal from "../TotalBids/TotalBids";


const NewRoundOverlay = () => {
    const dispatch = useDispatch();
    const teamNameOne = useSelector(state => state.newGame.teams.team1.name);
    const teamNameTwo = useSelector(state => state.newGame.teams.team2.name);
    const roundNumber = useSelector(state => state.newGame.rounds.currentRound);

    function handleClick(e) {
        e.preventDefault();
        const team1Total = document.getElementById(`${teamNameOne}-${roundNumber}-total`).innerHTML
        if (team1Total !== "total") {
            dispatch(setTotalBids({team: 'team1', bid: parseInt(team1Total)}));
        }
        const team2Total = document.getElementById(`${teamNameTwo}-${roundNumber}-total`).innerHTML
        if (team2Total !== "total") {
            dispatch(setTotalBids({team: 'team2', bid: parseInt(team2Total)}));
        }

        document.getElementById('newRoundOverlay').style.display = 'none';
        // dispatch(createNewRound())
    }


    return (
        <div id="newRoundOverlay">
        <div className="overlayWrapper">
            <div className="scoreWrapper">
                <h1 className="teamName teamNameOne">{teamNameOne}</h1>
                <div className="bidsWrapper">
                    <div className="inputWrapper">
                        <CreateEnterBids teamName={teamNameOne} roundNumber={roundNumber} bidNumber={1} />
                        <CreateEnterBids teamName={teamNameOne} roundNumber={roundNumber} bidNumber={2} />                  
                    </div>
                    <CreateBidsTotal teamName={teamNameOne} roundNumber={roundNumber} />
                </div>
            </div>
            <div className="scoreWrapper">
                <h1 className="teamName teamNameTwo">{teamNameTwo}</h1>
                <div className="bidsWrapper" style={{flexDirection: "row-reverse"}}>
                    <div className="inputWrapper">
                        <CreateEnterBids teamName={teamNameTwo} roundNumber={roundNumber} bidNumber={1} />
                        <CreateEnterBids teamName={teamNameTwo} roundNumber={roundNumber} bidNumber={2} />
                    </div>
                    <CreateBidsTotal teamName={teamNameTwo} roundNumber={roundNumber} />
                </div>
            </div>
        </div>
        <button className="primaryButton" onClick={handleClick}>
            <p className="primaryButtonText">Submit</p>
        </button>
    </div>
    )
}

export default NewRoundOverlay;