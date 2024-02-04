import { useSelector } from "react-redux";
import { updateBidsTotal } from "../utils/utils";

const CreateEnterBids = (props) => {

    const { teamName, roundNumber, bidNumber } = props;
    const bidId = `${teamName}-${roundNumber}-${bidNumber}`;
    console.log(bidId);
    return (
        <select className="bidInput" id={bidId} onChange={updateBidsTotal(teamName, roundNumber)}>
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