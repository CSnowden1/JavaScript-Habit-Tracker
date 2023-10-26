import React, { useState } from 'react';

function SearchBar({ theme }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const inputStyles = {
    height: 'auto',
    width: 'auto',
    marginBottom: '1rem',
    color: theme !== 'light' ? 'white' : 'black',
    backgroundColor: theme !== 'light' ? 'black' : 'white',
    border: '1px solid ' + (theme !== 'light' ? 'gray' : 'black'),
    padding: '0.67857143em 1em',
    borderRadius: '0.28571429rem',
    outline: 'none',
    transition: 'box-shadow 0.1s ease, border-color 0.1s ease',
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearch}
      style={inputStyles} 
    />
  );
}

export default SearchBar;
