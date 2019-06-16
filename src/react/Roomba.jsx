import React from 'react';

const Roomba = (props) => {
  if (props.cleaning) {
    if (props.moves < props.maxMoves) {
      clean(props);
    } else {
      props.finish();
    }
  }
  return (
    <img src={'images/Roomba.jpg'} alt="Roomba.jpg" style={props.styles} />
  );
};

const move = (props) => {
  const moves = ['up', 'right', 'down', 'left'];
  if (props.roombaPosition.x === 0) {
    moves.splice(moves.indexOf('left'), 1);
  } else if (props.roombaPosition.x === props.boardSize - 1) {
    moves.splice(moves.indexOf('right'), 1);
  }
  if (props.roombaPosition.y === 0) {
    moves.splice(moves.indexOf('up'), 1);
  } else if (props.roombaPosition.y === props.boardSize - 1) {
    moves.splice(moves.indexOf('down'), 1);
  }
  const attempts = [];
  for (let i = 0; i < moves.length; i++) {
    let newMove = true;
    let direction;
    while (true) {
      direction = moves[Math.floor(Math.random() * moves.length)];
      if (!attempts.includes(direction)) {
        break;
      }
    }
    const newLocation = {};
    switch (direction) {
      case 'up':
        newLocation.x = props.roombaPosition.x;
        newLocation.y = props.roombaPosition.y - 1;
        break;
      case 'right':
        newLocation.x = props.roombaPosition.x + 1;
        newLocation.y = props.roombaPosition.y;
        break;
      case 'down':
        newLocation.x = props.roombaPosition.x;
        newLocation.y = props.roombaPosition.y + 1;
        break;
      default:
        newLocation.x = props.roombaPosition.x - 1;
        newLocation.y = props.roombaPosition.y;
        break;
    }
    props.moveHistory.forEach((prevMove) => {
      if (prevMove.x === newLocation.x && prevMove.y === newLocation.y) {
        newMove = false;
        attempts.push(direction);
      }
    });
    if (newMove) {
      props.moveRoomba(newLocation);
      break;
    }
    if (attempts.length === moves.length) {
      props.resetMoveHistory();
    }
  }
};

const foundDirt = (props) => {
  if (
    props.dirtPosition.x === props.roombaPosition.x &&
    props.dirtPosition.y === props.roombaPosition.y
  ) {
    return true;
  } else {
    return false;
  }
};

const clean = async (props) => {
  await wait(props.roombaSpeed);
  if (foundDirt(props)) {
    props.consumeDirt();
  } else {
    move(props);
  }
};

const wait = (length) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, length);
  });
};

export default Roomba;
