import React, { useState, useLayoutEffect } from 'react';

const DecksContext = React.createContext();

export default DecksContext;

export const useDecks = () => {
  const context = React.useContext(DecksContext);
  if (!context) throw new Error(`useDecks must be used within a DecksProvider`);

  return context;
};

export const DecksProvider = (props) => {
  return (
    <DecksContext.Provider value={{}}>{props.children}</DecksContext.Provider>
  );
};
