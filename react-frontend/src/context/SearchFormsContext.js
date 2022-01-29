import React, { useState } from 'react';
import defaultsTwdForm from 'components/forms_data/defaultsTwdForm.json';
import defaultsCryptForm from 'components/forms_data/defaultsCryptForm.json';
import defaultsLibraryForm from 'components/forms_data/defaultsLibraryForm.json';

const SearchFormsContext = React.createContext();

export default SearchFormsContext;

export const useSearchForms = () => {
  const context = React.useContext(SearchFormsContext);
  if (!context)
    throw new Error(`useSearchForms must be used within a SearchFormsrovider`);

  return context;
};

export const SearchFormsProvider = (props) => {
  const [twdFormState, setTwdFormState] = useState(
    JSON.parse(JSON.stringify(defaultsTwdForm))
  );
  const [cryptFormState, setCryptFormState] = useState(
    JSON.parse(JSON.stringify(defaultsCryptForm))
  );
  const [libraryFormState, setLibraryFormState] = useState(
    JSON.parse(JSON.stringify(defaultsLibraryForm))
  );

  return (
    <SearchFormsContext.Provider
      value={{
        twdFormState,
        setTwdFormState,
        cryptFormState,
        setCryptFormState,
        libraryFormState,
        setLibraryFormState,
      }}
    >
      {props.children}
    </SearchFormsContext.Provider>
  );
};
