import { useState } from 'react';
import { Input } from 'semantic-ui-react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Input
      icon='search'
      placeholder='Search...'
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}

export default SearchBar;
