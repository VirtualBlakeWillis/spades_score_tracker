/*
function newRoundOverlay({teamNameOne = 'teamOne', teamNameTwo = 'teamTwo'} = {}) {
    roundNumber++; 
  
    let body = document.querySelector("body");
    let innerHtml = `
    <div id="newRoundOverlay">
        <div class="overlayWrapper">
            <div class="scoreWrapper">
                <h1 class="teamName teamNameOne">${teamNameOne}</h1>
                <div class="bidsWrapper">
                    <div class="inputWrapper">
                        ${createEnterBids('teamOne', roundNumber, 1)}                     
                        ${createEnterBids('teamOne', roundNumber, 2)}                     
                    </div>
                    ${createBidsTotal('teamOne', roundNumber)}
                </div>
            </div>
            <div class="scoreWrapper">
                <h1 class="teamName teamNameTwo">${teamNameTwo}</h1>
                <div class="bidsWrapper" style="flex-direction: row-reverse;">
                    <div class="inputWrapper">
                    ${createEnterBids('teamTwo', roundNumber, 1)}                     
                    ${createEnterBids('teamTwo', roundNumber, 2)}  
                    </div>
                    ${createBidsTotal('teamTwo', roundNumber)}
                </div>
            </div>
        </div>
        <button class="primaryButton" onclick="createNewRound();">
            <p class="primaryButtonText">Submit</p>
        </button>
    </div>
    `
    body.innerHTML += innerHtml;
    overlayOn('newRoundOverlay');
  
    let b1 = document.querySelector(`#teamOne${roundNumber}1`);
    let b2 = document.querySelector(`#teamOne${roundNumber}2`);
    let b3 = document.querySelector(`#teamTwo${roundNumber}1`);
    let b4 = document.querySelector(`#teamTwo${roundNumber}2`);
  
    b1.addEventListener("change", function() { updateBidsTotal('teamOne', roundNumber) });
    b2.addEventListener("change", function() { updateBidsTotal('teamOne', roundNumber) });
    b3.addEventListener("change", function() { updateBidsTotal('teamTwo', roundNumber) });
    b4.addEventListener("change", function() { updateBidsTotal('teamTwo', roundNumber) });
}
*/
import { useSelector, useDispatch } from "react-redux";
import { createNewRound } from "../reducers/newGameSlice";
import CreateEnterBids from "../EnterBids/EnterBids";
import CreateBidsTotal from "../TotalBids/TotalBids";


const NewRoundOverlay = () => {
    const dispatch = useDispatch();
    const teamNameOne = useSelector(state => state.newGame.teams.team1.name);
    const teamNameTwo = useSelector(state => state.newGame.teams.team2.name);
    const roundNumber = useSelector(state => state.newGame.rounds.currentRound);


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
        <button className="primaryButton" /*onClick="createNewRound();" */>
            <p className="primaryButtonText">Submit</p>
        </button>
    </div>
    )
}

export default NewRoundOverlay;