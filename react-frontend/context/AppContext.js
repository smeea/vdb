import React, { useState, useLayoutEffect } from 'react';

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
  localizedCrypt: undefined,
  setLocalizedCrypt: () => {},
  localizedLibrary: undefined,
  setLocalizedLibrary: () => {},
  nativeCrypt: undefined,
  setNativeCrypt: () => {},
  nativeLibrary: undefined,
  setNativeLibrary: () => {},
});

export default AppContext;

export const AppProvider = (props) => {
  const isMobile = window.matchMedia('(max-width: 540px)').matches;
  const isWide = window.matchMedia('(min-width: 1600px)').matches;
  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [lang, setLang] = useState(window.localStorage.getItem('lang'));
  const [localizedCrypt, setLocalizedCrypt] = useState(undefined);
  const [localizedLibrary, setLocalizedLibrary] = useState(undefined);
  const [nativeCrypt, setNativeCrypt] = useState(undefined);
  const [nativeLibrary, setNativeLibrary] = useState(undefined);

  const toggleLang = () => {
    if (lang === 'en-EN') {
      setLang('es-ES');
      window.localStorage.setItem('lang', 'es-ES');
    } else if (lang === 'es-ES') {
      setLang('fr-FR');
      window.localStorage.setItem('lang', 'fr-FR');
    } else {
      setLang('en-EN');
      window.localStorage.setItem('lang', 'en-EN');
    }
  };

  useLayoutEffect(() => {
    const lastLang = window.localStorage.getItem('lang');

    if (lastLang) {
      setLang(lastLang);
    } else {
      setLang('en-EN');
    }
  }, [lang]);

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
        toggleLang,
        localizedCrypt,
        setLocalizedCrypt,
        localizedLibrary,
        setLocalizedLibrary,
        nativeCrypt,
        setNativeCrypt,
        nativeLibrary,
        setNativeLibrary,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
