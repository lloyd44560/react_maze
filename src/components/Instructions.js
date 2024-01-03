// Instructions.js
import React from 'react';
import './App.css';
const Instructions = ({ onBack }) => {
  return (
    <div>
      <h1>Instructions</h1>
      {/* Add your instruction content here */}
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default Instructions;
