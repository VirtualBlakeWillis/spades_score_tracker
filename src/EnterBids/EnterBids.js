import { useSelector, useDispatch } from "react-redux";
import { updateBidsTotal } from "../utils/utils";
import { setTotalBids } from "../reducers/newGameSlice";


const CreateEnterBids = (props) => {
    const teamNameOne = useSelector(state => state.newGame.teams.team1.name);
    const teamNameTwo = useSelector(state => state.newGame.teams.team2.name);

    const dispatch = useDispatch();

    /*          Switching dispatch to NewRoundOverlay component          */
    // function updateBids(teamName, roundNumber) {
    //     const total = updateBidsTotal(teamName, roundNumber);
    //     if (total) {
    //         console.log(total)
    //         if (teamName === teamNameOne) {
    //         dispatch(setTotalBids({team: 'team1', bid: total}));
    //         } else {
    //         dispatch(setTotalBids({team: 'team2', bid: total}));
    //         }
    //     }
    // }

    const { teamName, roundNumber, bidNumber } = props;
    const bidId = `${teamName}-${roundNumber}-${bidNumber}`;
    console.log(bidId);
    return (
        <select className="bidInput" id={bidId} onChange={() => {updateBidsTotal(teamName, roundNumber)}}>
        <option defaultValue>bid</option>
        <option value="0">nil</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
    </select>
    )
}

export default CreateEnterBids;