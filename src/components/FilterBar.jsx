import React from 'react';
import './FilterBar.css';

function FilterBar({ regions, selectedRegion, onRegionChange, onSortChange, sortOption }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="region-filter">Filter by Region:</label>
        <select 
          id="region-filter" 
          value={selectedRegion} 
          onChange={(e) => onRegionChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="sort-option">Sort by:</label>
        <select 
          id="sort-option" 
          value={sortOption} 
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="name">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="population">Population (Low to High)</option>
          <option value="populationDesc">Population (High to Low)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;