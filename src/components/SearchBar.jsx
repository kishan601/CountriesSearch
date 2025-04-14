import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for countries..." 
        className="search-input"
        aria-label="Search for countries"
      />
    </div>
  );
}

export default SearchBar;