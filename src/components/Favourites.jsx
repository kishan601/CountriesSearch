import React from 'react';
import './Favorites.css';

function Favorites({ favorites, onRemove, onView }) {
  if (favorites.length === 0) {
    return null;
  }
  
  return (
    <div className="favorites-container">
      <h3 className="favorites-title">
        <span>Your Favorites</span>
        <span className="favorites-count">{favorites.length}</span>
      </h3>
      
      <div className="favorites-list">
        {favorites.map((country) => (
          <div key={country.common} className="favorite-item">
            <img 
              src={country.png || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 30 20"><rect width="30" height="20" fill="%23f0f0f0"/></svg>'} 
              alt={`${country.common} Flag`} 
              className="favorite-flag"
            />
            <span className="favorite-name">{country.common}</span>
            <div className="favorite-actions">
              <button 
                className="favorite-view" 
                onClick={() => onView(country)}
                aria-label={`View ${country.common} details`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <button 
                className="favorite-remove" 
                onClick={() => onRemove(country)}
                aria-label={`Remove ${country.common} from favorites`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;