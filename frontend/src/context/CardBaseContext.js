import React from 'react';

const CardBaseContext = React.createContext();

export default CardBaseContext;

export const useCardBase = () => {
  const context = React.useContext(CardBaseContext);
  if (!context)
    throw new Error(`useCardBase must be used within a CardBaseProvider`);

  return context;
};

export const CardBaseProvider = (props) => {
  return (
    <CardBaseContext.Provider value={{}}>
      {props.children}
    </CardBaseContext.Provider>
  );
};
