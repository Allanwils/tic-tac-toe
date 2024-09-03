import { useState, useEffect } from "react";
import "./styles.css";

function Square({ value, onClick }) {
  return (
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
}

function TicTacToe() {
  const [square, setsquare] = useState(Array(9).fill(""));
  const [isXturn, setIsXturn] = useState(true);
  const [status, setStatus] = useState("");

  function getWinner(square) {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }

  function handleClick(getCurrentSquare) {
    let cpySquare = [...square];
    if (getWinner(cpySquare) || cpySquare[getCurrentSquare]) return;
    cpySquare[getCurrentSquare] = isXturn ? "X" : "O";
    setIsXturn(!isXturn);
    setsquare(cpySquare);
  }

  //console.log(square);

  useEffect(() => {
    if (!getWinner(square) && square.every((item) => item !== "")) {
      setStatus("It's a draw!. Pse restart the game.");
    } else if (getWinner(square)) {
      setStatus(`${isXturn ? "O" : "X"} is the winner!`);
    } else {
      setStatus(`It's ${isXturn ? "X" : "O"}'s turn`);
    }
  }, [square, isXturn]);

  return (
    <div className="tic-tac-toe-container">
      <h1>Tic Tac Toe</h1>
      <div className="row">
        <Square value={square[0]} onClick={() => handleClick(0)} />
        <Square value={square[1]} onClick={() => handleClick(1)} />
        <Square value={square[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={square[3]} onClick={() => handleClick(3)} />
        <Square value={square[4]} onClick={() => handleClick(4)} />
        <Square value={square[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={square[6]} onClick={() => handleClick(6)} />
        <Square value={square[7]} onClick={() => handleClick(7)} />
        <Square value={square[8]} onClick={() => handleClick(8)} />
      </div>
      <h4>{status}</h4>
    </div>
  );
}

export default TicTacToe;
