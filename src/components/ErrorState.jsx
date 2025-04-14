import React from 'react';
import './ErrorState.css';

function ErrorState({ error, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="error-title">Failed to load countries</h2>
      <p className="error-message">
        {error?.message || 'Unable to fetch country data. Please try again.'}
      </p>
      <button 
        className="retry-button" 
        onClick={onRetry} 
        aria-label="Retry loading countries"
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorState;