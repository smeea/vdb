import React from 'react';

const UserContext = React.createContext();

export default UserContext;

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) throw new Error(`useUser must be used within a UserProvider`);

  return context;
};

export const UserProvider = (props) => {
  return (
    <UserContext.Provider value={{}}>{props.children}</UserContext.Provider>
  );
};
