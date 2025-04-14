import React from 'react';
import './LoadingState.css';

function LoadingState() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading countries...</p>
    </div>
  );
}

export default LoadingState;