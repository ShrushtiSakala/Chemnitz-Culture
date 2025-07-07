import React, { createContext, useState } from 'react';

const FiltersContext = createContext({
  search: '',
  category: '',
  setSearch: () => {},
  setCategory: () => {},
});

export function FiltersProvider({ children }) {
  const [search, setSearch]         = useState('');
  const [category, setCategory]     = useState('');

  return (
    <FiltersContext.Provider
      value={{ search, setSearch, category, setCategory }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export default FiltersContext;
