import React, { useState } from "react";
import "./Settings.css";

const Settings = ({ onStartGame }) => {
  const [pairs, setPairs] = useState(6); // Predvolená hodnota

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartGame(pairs);
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <h2>Vyberte počet párov</h2>

      <div className="slider-container">
        <input
          type="range"
          min="1"
          max="30"
          value={pairs}
          onChange={(e) => setPairs(Number(e.target.value))}
        />
        <span className="slider-value">{pairs}</span>
      </div>

      <button type="submit">Spustiť hru</button>
    </form>
  );
};

export default Settings;
