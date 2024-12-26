import { useState } from "react";

export default function EnterBids({teamName, roundNumber, bidNumber, onChange} ) {
  const [goingNil, setGoingNil] = useState(false);
  const bidId = `${teamName}${roundNumber}${bidNumber}`

  function handleChange(e) {
    if (e.target.value === '0') {
      setGoingNil(true);
    }
    onChange();
  }
  return (
    <>
  <select className="bidInput" id={bidId} defaultValue={-1} onChange={handleChange}>
      <option value="-1">bid</option>
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
  { goingNil && (
      <>
        <label htmlFor={`${teamName}${roundNumber}nil`} >Blind Nil?</label>
        <input type="checkbox" className="blindNilInput" id={`${teamName}${roundNumber}nil`} />
      </>
    )
  }
  </>
  )
}