import React from 'react';
import clone from 'lodash.clonedeep';

import Roomba from './Roomba';

const Cell = (props) => {
  const imgStyles = clone(props.style);
  for (var style in imgStyles) {
    imgStyles[style] = imgStyles[style] - 20;
  }

  if (
    props.roombaPosition.x === props.x &&
    props.roombaPosition.y === props.y
  ) {
    return (
      <th className="Cell" style={props.style}>
        <Roomba styles={imgStyles} {...props} />
      </th>
    );
  } else if (
    props.dirtPosition.x === props.x &&
    props.dirtPosition.y === props.y
  ) {
    return (
      <th className="Cell" style={props.style}>
        <img src={'images/Dirt.jpg'} alt="Dirt.jpg" style={imgStyles} />
      </th>
    );
  } else {
    return <th className="Cell" style={props.style} />;
  }
};

export default Cell;
