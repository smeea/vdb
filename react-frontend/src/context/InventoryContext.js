import React, { useState, useLayoutEffect } from 'react';

const InventoryContext = React.createContext();

export default InventoryContext;

export const useInventory = () => {
  const context = React.useContext(InventoryContext);
  if (!context)
    throw new Error(`useInventory must be used within a InventoryProvider`);

  return context;
};

export const InventoryProvider = (props) => {
  return (
    <InventoryContext.Provider value={{}}>
      {props.children}
    </InventoryContext.Provider>
  );
};
