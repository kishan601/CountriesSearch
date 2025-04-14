import React from 'react';
import CountryCard from './CountryCard';
import './CountryGrid.css';

function CountryGrid({ countries }) {
  return (
    <div className="country-grid">
      {countries.map((country, index) => (
        <CountryCard key={index} country={country} />
      ))}
    </div>
  );
}

export default CountryGrid;