import React from 'react';
import './CountryCard.css';

function CountryCard({ country }) {
  // Get country name from API response
  const countryName = country.common || 'Unknown Country';
  
  // Get flag URL from API response
  const flagUrl = country.png || '';
  
  // Alt text for accessibility
  const altText = `${countryName} Flag`;

  return (
    <div className="country-card">
      {flagUrl ? (
        <img 
          src={flagUrl} 
          alt={altText} 
          className="country-flag"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="50" viewBox="0 0 80 50"><rect width="80" height="50" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23999">No Flag</text></svg>';
            e.target.alt = "Flag not available";
          }}
        />
      ) : (
        <div className="no-flag-placeholder">
          No Flag
        </div>
      )}
      <div className="country-name">{countryName}</div>
    </div>
  );
}

export default CountryCard;