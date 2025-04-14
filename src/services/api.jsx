/**
 * Fetches all countries from the API
 * @returns {Promise<Array>} - Promise that resolves to an array of countries
 */
export const fetchCountries = async () => {
  try {
    const response = await fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries');
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

/**
 * Filters countries based on search term
 * @param {Array} countries - Array of country objects
 * @param {string} searchTerm - Term to filter countries by
 * @returns {Array} - Filtered array of countries
 */
export const filterCountries = (countries, searchTerm) => {
  if (!searchTerm) return countries;
  
  return countries.filter(country => {
    const countryName = country.common ? country.common.toLowerCase() : '';
    return countryName.includes(searchTerm.toLowerCase());
  });
};