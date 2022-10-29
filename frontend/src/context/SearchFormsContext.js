import React, { useState } from 'react';

const SearchFormsContext = React.createContext();

export default SearchFormsContext;

export const useSearchForms = () => {
  const context = React.useContext(SearchFormsContext);
  if (!context)
    throw new Error(`useSearchForms must be used within a SearchFormsrovider`);

  return context;
};

export const SearchFormsProvider = (props) => {
  const [quickCard, setQuickCard] = useState(undefined);

  return (
    <SearchFormsContext.Provider
      value={{
        quickCard,
        setQuickCard,
      }}
    >
      {props.children}
    </SearchFormsContext.Provider>
  );
};
