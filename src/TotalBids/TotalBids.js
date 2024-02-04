
const CreateTotalBids = (props) => {
    const { teamName, roundNumber } = props;
    const bidId = `${teamName}-${roundNumber}-total`;
    return (
        <div className="bidInputTotal" id={bidId}>total</div>

    )
}

export default CreateTotalBids;