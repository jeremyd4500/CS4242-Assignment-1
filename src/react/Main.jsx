import React, { Component } from 'react';
import ControlPanel from './ControlPanel';
import ChessBoard from './ChessBoard';

import '../styles/Main.css';

class Main extends Component {
  state = {
    averageMoves: [],
    boardSize: 5,
    cleaning: false,
    consumedDirt: 0,
    dirtPosition: {
      x: 0,
      y: 0
    },
    maxMoves: 1000,
    moveHistory: [],
    roombaPosition: {
      x: 0,
      y: 0
    },
    roombaSpeed: 1,
    moves: 0,
    movesPerClean: 0
  };

  render() {
    const Functions = {
      calculateAverageMoves: this.calculateAverageMoves,
      changeMaxMoves: this.changeMaxMoves,
      changeRoombaSpeed: this.changeRoombaSpeed,
      consumeDirt: this.consumeDirt,
      decreaseSize: this.decreaseSize,
      finish: this.finish,
      increaseSize: this.increaseSize,
      increaseMoves: this.increaseMoves,
      moveRoomba: this.moveRoomba,
      resetMoveHistory: this.resetMoveHistory,
      startCleaning: this.startCleaning,
      stopCleaning: this.stopCleaning
    };

    return (
      <div className="Main">
        <ControlPanel {...Functions} {...this.state} />
        <ChessBoard {...Functions} {...this.state} />
      </div>
    );
  }

  calculateAverageMoves = () => {
    if (this.state.averageMoves.length === 0) {
      return 0;
    }
    let total = 0;
    this.state.averageMoves.forEach((avg) => {
      total += avg;
    });
    return Math.floor(total / this.state.consumedDirt);
  };

  changeMaxMoves = (newMax) => {
    this.stopCleaning();
    this.setState((prevState) => {
      prevState.maxMoves = parseInt(newMax);
      return { maxMoves: prevState.maxMoves };
    });
  };

  changeRoombaSpeed = (newSpeed) => {
    this.stopCleaning();
    this.setState((prevState) => {
      prevState.roombaSpeed = parseInt(newSpeed);
      return { roombaSpeed: prevState.roombaSpeed };
    });
  };

  consumeDirt = () => {
    this.setState((prevState) => {
      prevState.averageMoves.push(prevState.movesPerClean);
      prevState.consumedDirt++;
      prevState.moveHistory = [];
      while (true) {
        const newX = Math.floor(Math.random() * prevState.boardSize);
        const newY = Math.floor(Math.random() * prevState.boardSize);
        if (
          newX !== prevState.roombaPosition.x ||
          newY !== prevState.roombaPosition.y
        ) {
          prevState.dirtPosition.x = newX;
          prevState.dirtPosition.y = newY;
          break;
        }
      }
      prevState.movesPerClean = 0;
      return {
        averageMoves: prevState.averageMoves,
        consumedDirt: prevState.consumedDirt,
        dirtPosition: prevState.dirtPosition,
        moveHistory: prevState.moveHistory,
        movesPerClean: prevState.movesPerClean
      };
    });
  };

  decreaseSize = () => {
    this.stopCleaning();
    if (this.state.boardSize > 3) {
      this.setState((prevState) => {
        prevState.boardSize = prevState.boardSize - 1;
        return { boardSize: prevState.boardSize };
      });
    }
  };

  finish = () => {
    alert(
      `The roomba has reached ${this.state.maxMoves} moves.` +
        `\nTotal dirt collected: ${this.state.consumedDirt}` +
        `\nAverage moves taken per dirt collection: ${this.calculateAverageMoves()}` +
        `\nNow resetting the floor...`
    );
    this.stopCleaning();
  };

  increaseSize = () => {
    this.stopCleaning();
    if (this.state.boardSize < 8) {
      this.setState((prevState) => {
        prevState.boardSize = prevState.boardSize + 1;
        return { boardSize: prevState.boardSize };
      });
    }
  };

  increaseMoves = () => {
    this.setState((prevState) => {
      prevState.moves++;
      return { moves: prevState.moves };
    });
  };

  moveRoomba = (newPosition) => {
    this.setState((prevState) => {
      prevState.roombaPosition = {
        ...prevState.roombaPosition,
        ...newPosition
      };
      prevState.moveHistory.push(prevState.roombaPosition);
      prevState.moves++;
      prevState.movesPerClean++;
      return {
        moveHistory: prevState.moveHistory,
        roombaPosition: prevState.roombaPosition,
        moves: prevState.moves,
        movesPerClean: prevState.movesPerClean
      };
    });
  };

  reset = () => {
    this.setState((prevState) => {
      prevState.averageMoves = [];
      prevState.consumedDirt = 0;
      prevState.dirtPosition = {
        x: 0,
        y: 0
      };
      prevState.roombaPosition = {
        x: 0,
        y: 0
      };
      prevState.moves = 0;
      prevState.movesPerClean = 0;
      return {
        averageMoves: prevState.averageMoves,
        consumedDirt: prevState.consumedDirt,
        dirtPosition: prevState.dirtPosition,
        roombaPosition: prevState.roombaPosition,
        moves: prevState.moves,
        movesPerClean: prevState.movesPerClean
      };
    });
  };

  resetMoveHistory = () => {
    this.setState((prevState) => {
      prevState.moveHistory = [];
      return { moveHistory: prevState.moveHistory };
    });
  };

  startCleaning = () => {
    this.reset();
    this.setState((prevState) => {
      prevState.cleaning = true;
      return { cleaning: prevState.cleaning };
    });
  };

  stopCleaning = () => {
    this.reset();
    this.setState((prevState) => {
      prevState.cleaning = false;
      return { cleaning: prevState.cleaning };
    });
  };
}

export default Main;
