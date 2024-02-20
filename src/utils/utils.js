import { useDispatch } from "react-redux";
import { setTotalBids } from "../reducers/newGameSlice";

function updateBidsTotal(teamName, roundNumber) {

    const bidId = `${teamName}-${roundNumber}-total`;


    const bidOneId = `${teamName}-${roundNumber}-1`;
    const bidTwoId = `${teamName}-${roundNumber}-2`;

    let bidOne = document.querySelector(`#${bidOneId}`);
    let bidTwo = document.querySelector(`#${bidTwoId}`);

    if (bidOne == null || bidTwo == null) {
      console.log("missing Bids!");
      return
    }
    bidOne = bidOne.value;
    bidTwo = bidTwo.value;
    if (bidOne == "bid" || bidTwo == "bid") {
      console.log("missing Bids!");
      return
    } else {
      console.log("updating total");
      const bidTotal = parseInt(bidOne) + parseInt(bidTwo);
        let total = document.querySelector(`#${teamName}-${roundNumber}-total`);
        total.innerHTML = bidTotal;
        return bidTotal;
    }
}


export { updateBidsTotal };