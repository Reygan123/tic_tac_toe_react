import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  let textClassName = "";

  if (value === "X") {
    textClassName =
      "font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500 text-shadow-md";
  } else if (value === "O") {
    textClassName =
      "font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400 text-shadow-md";
  }

  return (
    <button
      className={`square w-40 h-40 border-4 bg-gray-500 border-gray-700 text-7xl font-bold rounded-xl ${textClassName}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = (
      <span class="text-xl">
        Next player:{" "}
        <span class={xIsNext ? "x-text" : "o-text"}>{xIsNext ? "X" : "O"}</span>
      </span>
    );
  }

  return (
    <>
      <div className="status" class="text-xl" text>
        {status}
      </div>
      <div class="rounded-xl my-10">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = (
        <span class="px-4 py-2 bg-green-500 rounded-lg shadow-md mt-4">
          Go to game start
        </span>
      );
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="px-2 py-1">{description}</td>
              </tr>
            </tbody>
          </table>
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol class="text-lg">{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <div class="bg-gray-700 h-screen p-10 flex justify-center text-center text-white font-bold">
      <Game />
    </div>
  );
}

export default App;
