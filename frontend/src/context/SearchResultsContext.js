import React, { useState } from 'react';

const SearchResultsContext = React.createContext();

export default SearchResultsContext;

export const useSearchResults = () => {
  const context = React.useContext(SearchResultsContext);
  if (!context)
    throw new Error(
      `useSearchResults must be used within a SearchResultsProvider`
    );

  return context;
};

export const SearchResultsProvider = (props) => {
  const [cryptCompare, setCryptCompare] = useState(undefined);
  const [libraryCompare, setLibraryCompare] = useState(undefined);

  return (
    <SearchResultsContext.Provider
      value={{
        cryptCompare,
        setCryptCompare,
        libraryCompare,
        setLibraryCompare,
      }}
    >
      {props.children}
    </SearchResultsContext.Provider>
  );
};
