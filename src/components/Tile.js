// Tile.js
import React from 'react';

const Tile = ({ type, children }) => {
  return <div className={`tile type-${type}`}>{children}</div>;
};

export default Tile;
