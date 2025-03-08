import React from 'react';
import { useGameDispatch } from '../../GameContext';
import './NewGame.css';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  defaultValue: string;
}

function TextInput({ id, label, placeholder }: { id: string; label: string; placeholder: string }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">{label}</label>
      <input 
        type="text" 
        id={id} 
        name={id} 
        placeholder={placeholder} 
        required 
        autoComplete="off"
        className="form-input"
      />
    </div>
  );
}

function RadioGroup({ name, label, options, defaultValue }: RadioGroupProps) {
  return (
    <fieldset className="form-group">
      <legend className="form-label">{label}</legend>
      <div className="radio-options">
        {options.map(({ value, label }) => (
          <label key={value} className="radio-label" htmlFor={`${name}-${value}`}>
            <input
              type="radio"
              id={`${name}-${value}`}
              name={name}
              value={value}
              defaultChecked={value === defaultValue}
              className="radio-input"
            />
            <span className="radio-text">{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function NewGame() {
  const dispatch = useGameDispatch();
  
  const targetScoreOptions: RadioOption[] = [
    { value: "300", label: "300" },
    { value: "500", label: "500" }
  ];

  const sandbagOptions: RadioOption[] = [
    { value: "5", label: "5" },
    { value: "7", label: "7" },
    { value: "10", label: "10" }
  ];

  function createNewGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const aTeamName = formData.get('aTeam') as string;
    const bTeamName = formData.get('bTeam') as string;
    const targetScore = formData.get('targetScore') as string;
    const sandbagPenalty = formData.get('sandbagPenalty') as string;

    if (!aTeamName || !bTeamName || !targetScore || !sandbagPenalty) {
      return; // Form validation will handle required fields
    }

    dispatch({
      type: 'setupGame',
      payload: {
        aTeamName,
        bTeamName,
        targetScore: Number(targetScore),
        sandbagThreshold: Number(sandbagPenalty),
        nilBonus: Number(sandbagPenalty) * 10,
      },
    });
  }
  
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>New Game</h1>
      </header>
      <main className="form-container">
        <form onSubmit={createNewGame} className="new-game-form">
          <TextInput
            id="aTeam"
            label="Team One"
            placeholder="Enter team name"
          />
          <TextInput
            id="bTeam"
            label="Team Two"
            placeholder="Enter team name"
          />
          <RadioGroup
            name="targetScore"
            label="Target Score"
            options={targetScoreOptions}
            defaultValue="300"
          />
          <RadioGroup
            name="sandbagPenalty"
            label="Sandbag Penalty"
            options={sandbagOptions}
            defaultValue="5"
          />
          <div className="form-footer">
            <button type="submit" className="primary-button">
              Begin Game
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 