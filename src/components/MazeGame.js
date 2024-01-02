import React, { useState, useEffect } from 'react';
import './App.css';

const levels = [
  { rows: 8, cols: 8 },   // Level 1
  { rows: 16, cols: 16 }, // Level 2
  { rows: 32, cols: 32 }, // Level 3
];

const Maze = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [goal, setGoal] = useState({ x: 0, y: 0 });
  const [isGameWon, setIsGameWon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);

  const { rows, cols } = levels[currentLevel];

  const movePlayer = (dx, dy) => {
    const newPosition = { x: position.x + dx, y: position.y + dy };

    // Check if the new position is within the bounds of the maze
    if (newPosition.x >= 0 && newPosition.x < cols && newPosition.y >= 0 && newPosition.y < rows) {
      setPosition(newPosition);

      // Check if the player reached the goal
      if (newPosition.x === goal.x && newPosition.y === goal.y) {
        setIsGameWon(true);
        alert('Congratulations! You reached the goal.');

        // Move to the next level if available
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1);
          setGoal({ x: levels[currentLevel + 1].cols - 1, y: levels[currentLevel + 1].rows - 1 });
          setPosition({ x: 0, y: 0 }); // Set the player's position to the top-left corner
          setIsGameWon(false); // Reset game status
        } else {
          // All levels completed
          alert('Congratulations! You completed all levels!');
          // You may choose to reset the game or handle completion as needed
        }
      }
    }
  };

  useEffect(() => {
    // Check if the device is a mobile device
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    // Set initial goal position
    setGoal({ x: cols - 1, y: rows - 1 });

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
  }, [position, goal, isGameWon, isMobile, currentLevel, cols, rows]);

  const handleButtonClick = (direction) => {
    if (isGameWon) return; // Game is won, no need to handle button clicks

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
    const mazeRows = Array.from({ length: rows }, (_, rowIndex) => (
      <div className="maze-row" key={rowIndex}>
        {Array.from({ length: cols }, (_, colIndex) => (
          <div
            key={colIndex}
            className={`maze-cell ${position.x === colIndex && position.y === rowIndex ? 'player' : ''} ${
              goal.x === colIndex && goal.y === rowIndex ? 'goal' : ''
            }`}
          ></div>
        ))}
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
};
function App() {
  const [currentLevel, setCurrentLevel] = useState(1); // Start with Level 1
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  const handleLevelChange = (newLevel) => {
    setCurrentLevel(newLevel);
    if (newLevel > levels.length) {
      // All levels completed
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
          // Endgame screen
          <div>
            <h1>Congratulations!</h1>
            <p>You completed all levels!</p>
            <button onClick={handleRestartGame}>Restart Game</button>
          </div>
        ) : (
          // Game screen
          <>
            <h1>Maze Game - Level {currentLevel}</h1>
            <Maze onLevelChange={handleLevelChange} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;