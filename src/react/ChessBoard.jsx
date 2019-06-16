import React from 'react';
import Cell from './Cell';

import '../styles/ChessBoard.css';

const ChessBoard = (props) => {
  return <div className="ChessBoard">{drawChessBoard(props)}</div>;
};

const drawChessBoard = (props) => {
  const sizes = {
    3: 250,
    4: 185,
    5: 150,
    6: 125,
    7: 105,
    8: 90
  };

  const height = [];
  const width = [];

  for (let i = 0; i < props.boardSize; i++) {
    height.push(i);
    width.push(i);
  }

  return (
    <table className="Board">
      <tbody className="Board-Body">
        {height.map((row, index) => {
          return (
            <tr className="Row" key={index}>
              {width.map((column, index2) => {
                return (
                  <Cell
                    style={{
                      width: sizes[props.boardSize],
                      height: sizes[props.boardSize]
                    }}
                    x={column}
                    y={row}
                    key={index2}
                    {...props}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ChessBoard;
