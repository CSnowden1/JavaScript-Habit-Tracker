import { useState } from 'react';
import { Input } from 'semantic-ui-react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };




  const filterStyles = {
    height: "auto",
    width: "auto",
    marginBottom: "1rem",
  };


  return (
    <Input
      icon='search'
      placeholder='Search...'
      value={searchTerm}
      onChange={handleSearch}
      style={filterStyles}
    />
  );
}

export default SearchBar;
