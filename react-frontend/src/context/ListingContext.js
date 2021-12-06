import React, { useState, useLayoutEffect } from 'react';

const ListingContext = React.createContext();

export default ListingContext;

export const useListing = () => {
  const context = React.useContext(ListingContext);
  if (!context)
    throw new Error(`useListing must be used within a ListingProvider`);

  return context;
};

export const ListingProvider = (props) => {
  return (
    <ListingContext.Provider value={{}}>
      {props.children}
    </ListingContext.Provider>
  );
};
