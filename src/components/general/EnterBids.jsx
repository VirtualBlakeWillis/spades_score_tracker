import { useState } from "react";
import './EnterBids.css';

export default function EnterBids({teamName, roundNumber, bidNumber, onChange} ) {
  const [goingNil, setGoingNil] = useState(false);
  const bidId = `${teamName}${roundNumber}${bidNumber}`;
  const blindNilId = `${teamName}${roundNumber}nil`;

  function handleChange(e) {
    if (e.target.value === '0') {
      setGoingNil(true);
    } else {
      setGoingNil(false);
    }
    onChange();
  }

  return (
    <div className="enter-bids">
      <select 
        className="bid-select" 
        id={bidId} 
        defaultValue={-1} 
        onChange={handleChange}
      >
        <option value="-1">Select Bid</option>
        <option value="0">Nil</option>
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
      {goingNil && (
        <div className="blind-nil-wrapper">
          <input 
            type="checkbox" 
            className="blind-nil-checkbox" 
            id={blindNilId} 
          />
          <label htmlFor={blindNilId}>Blind Nil</label>
        </div>
      )}
    </div>
  );
}