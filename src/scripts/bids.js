/* Create Bids Input */
function createEnterBids(teamName, roundNumber, bidNumber) {
  const bidId = teamName + roundNumber + bidNumber;
  const bid = `
  <select class="bidInput" id="${bidId}">
      <option selected>bid</option>
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
  `
  return bid;
}
function createBidsTotal(teamName, roundNumber) {
    const bidId = teamName + roundNumber + "total";
    const bid = `
    <div class="bidInputTotal" id="${bidId}">tot</div>
    `
    return bid;
}
function updateBidsTotal(teamName, roundNumber) {
    const bidOneId = teamName + roundNumber + 1;
    const bidTwoId = teamName + roundNumber + 2;
    const bidId = teamName + roundNumber + "total";
    const bidOne = document.querySelector(`#${bidOneId}`).value;
    const bidTwo = document.querySelector(`#${bidTwoId}`).value;

    console.log(bidOneId);
    if (bidOne == "bid" || bidTwo == "bid") {
      console.log("missing Bids!");
    } else {
      console.log("updating total");
      const bidTotal = parseInt(bidOne) + parseInt(bidTwo);
      document.querySelector(`#${bidId}`).innerHTML = bidTotal;
      console.log(bidId, document.querySelector(`#${bidId}`));
    }
    console.log(bidOne, bidTwo);
    return bidOne;
}

module.exports = {
  createEnterBids,
  createBidsTotal,
  updateBidsTotal
};
