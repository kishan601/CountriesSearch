import React from 'react';
import CountryCard from './CountryCard';
import './CountryGrid.css';

function CountryGrid({ countries, onCountryClick }) {
  return (
    <div className="country-grid">
      {countries.map((country, index) => (
        <CountryCard 
          key={index} 
          country={country} 
          onClick={onCountryClick} 
        />
      ))}
    </div>
  );
}

export default CountryGrid;