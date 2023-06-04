import React, { useCallback, useEffect, useState } from "react";
import createBoard from "../util/createBoard";

import reveal from "../util/reveal";
import gameLevel from "../util/gameLevel";

import Cell from "./Cell";
import Modal from "./Modal";

import "./Board.css";

function Board() {
  // State Variables
  const [grid, setGrid] = useState([]);
  const [mines, setMines] = useState([]);
  const [nonMineCounter, setNonMineCounter] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [elapsedTime, setElapsedTime] = useState(0);
  // Mobile flag 🚩
  const [flag, setFlag] = useState(false);

  // Function to start a new game
  const newGame = useCallback(() => {
    const { width, height, numMines } = gameLevel(difficulty);
    const { board, mineLocations } = createBoard(width, height, numMines);
    setGameOver(false);
    setGameWin(false);
    setGrid(board);
    setMines(mineLocations);
    setNonMineCounter(width * height - numMines);
    setElapsedTime(0);
  }, [difficulty]);

  // useEffect to start a new game when the difficulty level changes + timer
  useEffect(() => {
    newGame();
    const intervalId = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [newGame, difficulty]);

  // Function to handle right-click event and update the flag on a cell
  function updateFlag(event, x, y) {
    event.preventDefault();
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y].flagged = !newGrid[x][y].flagged;
    setGrid(newGrid);
  }

  // Function to reveal a cell when clicked
  function revealCell(event, x, y) {
    if (!grid[x][y].revealed) {
      const { newGrid, counter, game } = reveal(
        grid,
        x,
        y,
        mines,
        nonMineCounter
      );

      // Update the game state
      setGameOver(game);
      setGrid(newGrid);
      setNonMineCounter(counter);

      // Check if the player has won the game
      if (counter === 0) {
        setGameWin(true);
      }
    }
  }

  function handleDifficultyChange(event) {
    setDifficulty(event.target.value);
  }

  function flagHandler(event) {
    setFlag(!flag);
  }

  function formatTime(timeInSeconds) {
    const minutes = Math.trunc(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, 0)}`;
  }

  return (
    <div>
      <section>Difficulty Level:</section>
      <select value={difficulty} onChange={handleDifficultyChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      {gameWin && <Modal status="win" onClick={newGame} />}
      {gameOver && <Modal status="lose" onClick={newGame} />}
      <p>Cells left to uncover: {nonMineCounter}</p>
      <p style={{ fontWeight: "bold" }}>⏳ {formatTime(elapsedTime)}</p>
      <div className="board">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((item, colIndex) => (
              <Cell
                key={colIndex}
                onClick={(event) => {
                  if (!flag) {
                    revealCell(event, item.x, item.y);
                  } else {
                    updateFlag(event, item.x, item.y);
                  }
                }}
                onRightClick={(event) => updateFlag(event, item.x, item.y)}
              >
                {item}
              </Cell>
            ))}
          </div>
        ))}
      </div>
      {window.innerWidth <= 768 ? (
        <button
          className={`toggle ${flag ? "flagged" : ""}`}
          onClick={flagHandler}
        >
          🚩 Toggle
        </button>
      ) : (
        <h5>Right click on a cell to flag 🚩</h5>
      )}
    </div>
  );
}
export default Board;
