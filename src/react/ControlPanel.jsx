import React from 'react';

import '../styles/ControlPanel.css';

const ControlPanel = (props) => {
  return (
    <div className="ControlPanel">
      <div className="PanelBlock">
        <button onClick={props.startCleaning}>Start</button>
        <button onClick={props.stopCleaning}>Stop</button>
      </div>
      <div className="PanelBlock">
        <button onClick={props.increaseSize}>Increase Board Size</button>
        <button onClick={props.decreaseSize}>Decrease Board Size</button>
      </div>
      <div className="PanelBlock">
        <label>
          Speed
          <select
            onChange={(event) => {
              props.changeRoombaSpeed(event.target.value);
            }}
          >
            <option value={1}>100%</option>
            <option value={50}>90%</option>
            <option value={100}>80%</option>
            <option value={150}>70%</option>
            <option value={200}>60%</option>
            <option value={250}>50%</option>
            <option value={300}>40%</option>
            <option value={350}>30%</option>
            <option value={400}>20%</option>
            <option value={450}>10%</option>
          </select>
        </label>
        <label>
          Max Moves
          <select
            onChange={(event) => {
              props.changeMaxMoves(event.target.value);
            }}
          >
            <option value={1000}>1000</option>
            <option value={900}>900</option>
            <option value={800}>800</option>
            <option value={700}>700</option>
            <option value={600}>600</option>
            <option value={500}>500</option>
            <option value={400}>400</option>
            <option value={300}>300</option>
            <option value={200}>200</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>
      <div className="PanelBlock">
        <p>
          <b>Dirt Collected:</b>
          {` ${props.consumedDirt}`}
        </p>
        <p>
          <b>Moves/Collection:</b>
          {` ${props.calculateAverageMoves()}`}
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;
