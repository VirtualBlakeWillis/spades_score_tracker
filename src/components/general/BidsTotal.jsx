export default function BidsTotal({teamName, roundNumber}) {
  const bidId = `${teamName}${roundNumber}total`;
  
  return (
    <div className="bids-total" id={bidId}>
      <span>Total</span>
      total
    </div>
  );
}