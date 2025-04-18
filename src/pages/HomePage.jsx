import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import CountryGrid from '../components/CountryGrid';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import FilterBar from '../components/FilterBar';
import ThemeToggle from '../components/ThemeToggle';
import CountryModal from '../components/CountryModal';
import { fetchCountries } from '../services/api';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Apply dark mode
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    // Update CSS variables for dark mode
    if (isDarkMode) {
      document.documentElement.style.setProperty('--card-bg', '#2d3748');
      document.documentElement.style.setProperty('--text-color', '#e2e8f0');
      document.documentElement.style.setProperty('--heading-color', '#f7fafc');
      document.documentElement.style.setProperty('--border-color', '#4a5568');
      document.documentElement.style.setProperty('--placeholder-bg', '#2c3e50');
      document.documentElement.style.setProperty('--placeholder-color', '#a0aec0');
      document.documentElement.style.setProperty('--label-color', '#a0aec0');
      document.documentElement.style.setProperty('--value-color', '#e2e8f0');
      document.documentElement.style.setProperty('--input-bg', '#4a5568');
      document.documentElement.style.setProperty('--hover-bg', '#3c4a5e');
      document.documentElement.style.setProperty('--icon-color', '#a0aec0');
    } else {
      document.documentElement.style.setProperty('--card-bg', 'white');
      document.documentElement.style.setProperty('--text-color', '#2d3748');
      document.documentElement.style.setProperty('--heading-color', '#2c3e50');
      document.documentElement.style.setProperty('--border-color', '#f2f2f2');
      document.documentElement.style.setProperty('--placeholder-bg', '#f7f9fc');
      document.documentElement.style.setProperty('--placeholder-color', '#a0aec0');
      document.documentElement.style.setProperty('--label-color', '#4a5568');
      document.documentElement.style.setProperty('--value-color', '#4a5568');
      document.documentElement.style.setProperty('--input-bg', 'white');
      document.documentElement.style.setProperty('--hover-bg', '#f7fafc');
      document.documentElement.style.setProperty('--icon-color', '#718096');
    }
  }, [isDarkMode]);

  // Fetch countries
  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCountries();
        setCountries(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCountries();
  }, []);

  // Get unique regions for filter
  const regions = useMemo(() => {
    const uniqueRegions = Array.from(new Set(
      countries
        .filter(country => country.region)
        .map(country => country.region)
    ));
    return uniqueRegions.sort();
  }, [countries]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle region filter change
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  // Handle sort change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle country click
  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedCountry(null);
  };

  // Handle add to favorites
  const handleAddToFavorites = (country) => {
    if (!favorites.some(fav => fav.common === country.common)) {
      setFavorites([...favorites, country]);
      alert(`${country.common} added to favorites!`);
    }
  };

  // Filter countries based on search term and region
  const filteredCountries = useMemo(() => {
    return countries.filter(country => {
      const matchesSearch = country.common 
        ? country.common.toLowerCase().includes(searchTerm.toLowerCase()) 
        : false;
      
      const matchesRegion = !selectedRegion || 
        (country.region && country.region === selectedRegion);
      
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchTerm, selectedRegion]);

  // Sort filtered countries
  const sortedCountries = useMemo(() => {
    return [...filteredCountries].sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return (a.common || '').localeCompare(b.common || '');
        case 'nameDesc':
          return (b.common || '').localeCompare(a.common || '');
        case 'population':
          return (a.population || 0) - (b.population || 0);
        case 'populationDesc':
          return (b.population || 0) - (a.population || 0);
        default:
          return 0;
      }
    });
  }, [filteredCountries, sortOption]);

  // Retry loading countries
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    fetchCountries()
      .then(data => {
        setCountries(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data on retry: ', err);
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      
      <header>
        <h1>Countries of the World</h1>
        <p>Explore countries from around the globe and find information about their flags and names</p>
      </header>
      
      <SearchBar onSearch={handleSearch} />
      
      {!isLoading && !error && (
        <FilterBar 
          regions={regions}
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />
      )}
      
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRetry={handleRetry} />
      ) : sortedCountries.length > 0 ? (
        <CountryGrid 
          countries={sortedCountries} 
          onCountryClick={handleCountryClick}
        />
      ) : (
        <div className="no-results">
          No countries match your search. Try a different term.
        </div>
      )}

      {selectedCountry && (
        <CountryModal 
          country={selectedCountry} 
          onClose={handleCloseModal}
          onFavorite={handleAddToFavorites}
        />
      )}
    </div>
  );
}

export default HomePage;