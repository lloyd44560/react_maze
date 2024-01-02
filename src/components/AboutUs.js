// AboutUs.js
import React from 'react';

const AboutUs = ({ onBack }) => {
  return (
    <div>
      <h1>About Us</h1>
      {/* Add your about us content here */}
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default AboutUs;
