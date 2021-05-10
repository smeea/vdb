import React, { useState, useLayoutEffect } from 'react';

const AppContext = React.createContext({
  isMobile: false,
  username: undefined,
  setUsername: () => {},
  lang: 'en-EN',
  setLang: () => {},
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
  hideMissing: false,
  setHideMissing: () => {},
  inventoryMode: false,
  setInventoryMode: () => {},
  addMode: false,
  setAddMode: () => {},
  showImage: true,
  setShowImage: () => {},
});

export default AppContext;

export const AppProvider = (props) => {
  const isMobile = window.matchMedia('(max-width: 540px)').matches;
  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [lang, setLang] = useState('en-EN');
  const [localizedCrypt, setLocalizedCrypt] = useState(undefined);
  const [localizedLibrary, setLocalizedLibrary] = useState(undefined);
  const [nativeCrypt, setNativeCrypt] = useState(undefined);
  const [nativeLibrary, setNativeLibrary] = useState(undefined);
  const [showImage, setShowImage] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [inventoryMode, setInventoryMode] = useState(false);
  const [hideMissing, setHideMissing] = useState(false);

  const changeLang = (lang) => {
    setLang(lang);
    window.localStorage.setItem('lang', lang);
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
        username,
        setUsername,
        publicName,
        setPublicName,
        email,
        setEmail,
        lang,
        changeLang,
        localizedCrypt,
        setLocalizedCrypt,
        localizedLibrary,
        setLocalizedLibrary,
        nativeCrypt,
        setNativeCrypt,
        nativeLibrary,
        setNativeLibrary,
        hideMissing,
        setHideMissing,
        inventoryMode,
        setInventoryMode,
        addMode,
        setAddMode,
        showImage,
        setShowImage,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
