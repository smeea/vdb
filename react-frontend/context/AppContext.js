import React, { useState } from 'react';

const AppContext = React.createContext({
  isMobile: false,
  isWide: false,
  username: undefined,
  lang: 'en-EN',
  setLang: () => {},
  setUsername: () => {},
  publicName: undefined,
  setPublicName: () => {},
  email: undefined,
  setEmail: () => {},
  localizedCards: undefined,
  setLocalizedCards: () => {},
});

export default AppContext;

export const AppProvider = (props) => {
  const isMobile = window.matchMedia('(max-width: 540px)').matches;
  const isWide = window.matchMedia('(min-width: 1600px)').matches;
  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [lang, setLang] = useState('en-EN');
  const [localizedCards, setLocalizedCards] = useState(undefined);

  return (
    <AppContext.Provider
      value={{
        isMobile,
        isWide,
        username,
        setUsername,
        publicName,
        setPublicName,
        email,
        setEmail,
        lang,
        setLang,
        localizedCards,
        setLocalizedCards,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
