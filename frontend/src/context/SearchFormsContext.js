import React, { useState } from 'react';
import defaultsPdaForm from 'components/forms_data/defaultsPdaForm.json';
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
  const [pdaFormState, setPdaFormState] = useState(
    JSON.parse(JSON.stringify(defaultsPdaForm))
  );
  const [twdFormState, setTwdFormState] = useState(
    JSON.parse(JSON.stringify(defaultsTwdForm))
  );
  const [cryptFormState, setCryptFormState] = useState(
    JSON.parse(JSON.stringify(defaultsCryptForm))
  );
  const [libraryFormState, setLibraryFormState] = useState(
    JSON.parse(JSON.stringify(defaultsLibraryForm))
  );

  const [quickCard, setQuickCard] = useState(undefined);

  return (
    <SearchFormsContext.Provider
      value={{
        pdaFormState,
        setPdaFormState,
        twdFormState,
        setTwdFormState,
        cryptFormState,
        setCryptFormState,
        libraryFormState,
        setLibraryFormState,

        quickCard,
        setQuickCard,
      }}
    >
      {props.children}
    </SearchFormsContext.Provider>
  );
};
