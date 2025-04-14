import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CountryGrid from '../components/CountryGrid';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { fetchCountries } from '../services/api';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredCountries = countries.filter(country => {
    const countryName = country.common ? country.common.toLowerCase() : '';
    return countryName.includes(searchTerm.toLowerCase());
  });

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
      <header>
        <h1>Countries of the World</h1>
      </header>
      
      <SearchBar onSearch={handleSearch} />
      
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} onRetry={handleRetry} />
      ) : filteredCountries.length > 0 ? (
        <CountryGrid countries={filteredCountries} />
      ) : (
        <div className="no-results">
          No countries match your search. Try a different term.
        </div>
      )}
    </div>
  );
}

export default HomePage;