import React from 'react';
import './CountryModal.css';

function CountryModal({ country, onClose, onFavorite }) {
  if (!country) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <img 
            src={country.png || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="50" viewBox="0 0 80 50"><rect width="80" height="50" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23999">No Flag</text></svg>'} 
            alt={`${country.common} Flag`} 
            className="modal-flag"
          />
          <h2>{country.common}</h2>
        </div>
        
        <div className="modal-details">
          <div className="detail-row">
            <span className="detail-label">Official Name:</span>
            <span className="detail-value">{country.official || 'Not available'}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Region:</span>
            <span className="detail-value">{country.region || 'Not available'}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Subregion:</span>
            <span className="detail-value">{country.subregion || 'Not available'}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Capital:</span>
            <span className="detail-value">{country.capital || 'Not available'}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Population:</span>
            <span className="detail-value">
              {country.population ? country.population.toLocaleString() : 'Not available'}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Area:</span>
            <span className="detail-value">
              {country.area ? `${country.area.toLocaleString()} km²` : 'Not available'}
            </span>
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="save-favorite" onClick={() => onFavorite(country)}>
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default CountryModal;