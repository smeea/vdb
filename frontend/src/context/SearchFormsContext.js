import React, { useState } from 'react';
import defaultsPdaForm from 'components/forms_data/defaultsPdaForm.json';
import defaultsTwdForm from 'components/forms_data/defaultsTwdForm.json';

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

  const [quickCard, setQuickCard] = useState(undefined);

  return (
    <SearchFormsContext.Provider
      value={{
        pdaFormState,
        setPdaFormState,
        twdFormState,
        setTwdFormState,

        quickCard,
        setQuickCard,
      }}
    >
      {props.children}
    </SearchFormsContext.Provider>
  );
};
