export default function createBidsTotal({teamName, roundNumber}) {
  const bidId = `${teamName}${roundNumber}total`;
  return (
  <div
    className="bidInputTotal"
    id={bidId}
  >
    total
  </div>
  )
}