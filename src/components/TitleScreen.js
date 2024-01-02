// TitleScreen.js
import React from 'react';

const TitleScreen = ({ onStartGame, onInstructions, onAboutUs }) => {
  return (
    <div>
      <h1>Maze Game</h1>
      <div>
        <button onClick={onStartGame}>Start Game</button>
      </div>
      <div>
        <button onClick={onInstructions}>Instructions</button>
      </div>
      <div>
        <button onClick={onAboutUs}>About Us</button>
      </div>
    </div>
  );
};

export default TitleScreen;
