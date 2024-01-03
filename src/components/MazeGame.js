import React, { useState, useEffect } from 'react';
import './App.css';

const levels = [
  { rows: 8, cols: 8, walls: [[1, 0], [0, ], ] },   // Level 1 (with a wall at (1, 1))
  { rows: 16, cols: 16, walls: [[5, 5], [7, 8], [12, 10]] }, // Level 2 (example walls)
  { rows: 32, cols: 32, walls: [[8, 15], [20, 25], [28, 30]] }, // Level 3 (example walls)
];

const Maze = ({ onLevelChange }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [goal, setGoal] = useState({ x: 0, y: 0 });
  const [isGameWon, setIsGameWon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    // Check if the device is a mobile device
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    // Set initial goal position
    setGoal({ x: levels[currentLevel].cols - 1, y: levels[currentLevel].rows - 1 });

    const handleKeyDown = (e) => {
      if (isGameWon || isMobile) return; // Game is won or mobile device, no need to handle key events

      switch (e.key) {
        case 'ArrowUp':
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
          movePlayer(1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, goal, isGameWon, isMobile, currentLevel]);

  const movePlayer = (dx, dy) => {
    const newPosition = { x: position.x + dx, y: position.y + dy };

    if (
      newPosition.x >= 0 &&
      newPosition.x < levels[currentLevel].cols &&
      newPosition.y >= 0 &&
      newPosition.y < levels[currentLevel].rows &&
      !isWall(newPosition.x, newPosition.y)
    ) {
      setPosition(newPosition);

      if (newPosition.x === goal.x && newPosition.y === goal.y) {
        setIsGameWon(true);

        if (currentLevel < levels.length - 1) {
          setCurrentLevel((prevLevel) => {
            const nextLevel = prevLevel + 1;
            setGoal({ x: levels[nextLevel].cols - 1, y: levels[nextLevel].rows - 1 });
            setPosition({ x: 0, y: 0 });
            setIsGameWon(false);
            onLevelChange(nextLevel);
          
            if (nextLevel < levels.length) {
              alert(`Congratulations! You completed Level ${nextLevel}`);
              return nextLevel;
            } else {
              alert('Congratulations! You completed all levels!');
              return prevLevel;
            }
          });
          
        } else {
          alert('Congratulations! You completed all levels!');
        }
      }
    }
  };

  const isWall = (x, y) => {
    return (
      levels[currentLevel].walls &&
      levels[currentLevel].walls.some(([wallX, wallY]) => wallX === x && wallY === y)
    );
  };

  const handleButtonClick = (direction) => {
    if (isGameWon) return;

    switch (direction) {
      case 'up':
        movePlayer(0, -1);
        break;
      case 'down':
        movePlayer(0, 1);
        break;
      case 'left':
        movePlayer(-1, 0);
        break;
      case 'right':
        movePlayer(1, 0);
        break;
      default:
        break;
    }
  };

  const renderMaze = () => {
    const mazeRows = Array.from({ length: levels[currentLevel].rows }, (_, rowIndex) => (
      <div className="maze-row" key={rowIndex}>
        {Array.from({ length: levels[currentLevel].cols }, (_, colIndex) => {
          const cellClass = isWall(colIndex, rowIndex)
            ? 'wall'
            : position.x === colIndex && position.y === rowIndex
            ? 'player'
            : goal.x === colIndex && goal.y === rowIndex
            ? 'goal'
            : '';

          return (
            <div key={colIndex} className={`maze-cell ${cellClass}`}></div>
          );
        })}
      </div>
    ));

    return mazeRows;
  };

  const renderControls = () => {
    if (isMobile) {
      return (
        <div className="mobile-controls">
          <button onClick={() => handleButtonClick('up')}>↑</button>
          <div>
            <button onClick={() => handleButtonClick('left')}>←</button>
            <button onClick={() => handleButtonClick('down')}>↓</button>
            <button onClick={() => handleButtonClick('right')}>→</button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="maze-container">
      <div className="maze">{renderMaze()}</div>
      {renderControls()}
    </div>
  );
};function App() {
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1); // Initialize current level to 1

  const handleLevelChange = (newLevel) => {
    if (newLevel <= levels.length) {
      setCurrentLevel(newLevel + 1); // Increment the current level
    } else {
      setIsGameCompleted(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentLevel(1);
    setIsGameCompleted(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isGameCompleted ? (
          <div>
            <h1>Congratulations!</h1>
            <p>You completed all levels!</p>
            <button onClick={handleRestartGame}>Restart Game</button>
          </div>
        ) : (
          <>
            <center><h1>Maze Game - Level {currentLevel}</h1></center>
            {currentLevel <= levels.length ? (
              <Maze onLevelChange={handleLevelChange} />
            ) : (
              <div>
                <h1>Congratulations!</h1>
                <p>You successfully completed all levels!</p>
                <button onClick={handleRestartGame}>Restart Game</button>
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
