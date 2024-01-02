// App.js
import React, { useState } from 'react';
import TitleScreen from './components/TitleScreen';
import MazeGame from './components/MazeGame';

const App = () => {
  const [currentPage, setCurrentPage] = useState('title');
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleStartGame = () => {
    setCurrentPage('game');
  };

  const handleInstructions = () => {
    setCurrentPage('instructions');
  };

  const handleAboutUs = () => {
    setCurrentPage('aboutUs');
  };

  const handleLevelComplete = () => {
    if (currentLevel < 3) {
      setCurrentLevel((prev) => prev + 1);
    } else {
      // All levels complete, redirect to the title screen
      setCurrentLevel(1);
      setCurrentPage('title');
    }
  };

  const renderPage = () => {
    if (currentPage === 'title') {
      return (
        <TitleScreen
          onStartGame={handleStartGame}
          onInstructions={handleInstructions}
          onAboutUs={handleAboutUs}
        />
      );
    } else if (currentPage === 'instructions') {
      return (
        <div>
          <h2>Instructions</h2>
          <p>This is where you provide instructions for the maze game.</p>
          <button onClick={() => setCurrentPage('title')}>Back to Title</button>
        </div>
      );
    } else if (currentPage === 'aboutUs') {
      return (
        <div>
          <h2>About Us</h2>
          <p>This is where you provide information about the creators of the maze game.</p>
          <button onClick={() => setCurrentPage('title')}>Back to Title</button>
        </div>
      );
    } else if (currentPage === 'game') {
      return <MazeGame onLevelComplete={handleLevelComplete} />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default App;
