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
  const [pdaResults, setPdaResults] = useState(undefined);
  const [twdResults, setTwdResults] = useState(undefined);
  const [cryptResults, setCryptResults] = useState(undefined);
  const [libraryResults, setLibraryResults] = useState(undefined);

  const [cryptCompare, setCryptCompare] = useState(undefined);
  const [libraryCompare, setLibraryCompare] = useState(undefined);

  return (
    <SearchResultsContext.Provider
      value={{
        pdaResults,
        setPdaResults,
        twdResults,
        setTwdResults,
        cryptResults,
        setCryptResults,
        libraryResults,
        setLibraryResults,

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
