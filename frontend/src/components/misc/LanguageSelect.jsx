import React from 'react';
import FlagEn from 'assets/images/flags/en.svg';
import FlagEs from 'assets/images/flags/es.svg';
import FlagFr from 'assets/images/flags/fr.svg';
import FlagBr from 'assets/images/flags/br.svg';
import { useApp } from 'context';

const LanguagesMenu = ({ languages, lang, onClick }) => (
  <div className="py-1">
    <div className="px-2 pb-2">Card Language:</div>
    <div className="flex items-center justify-between">
      {Object.keys(languages).map((l) => {
        const Flag = languages[l];
        return (
          <div
            key={l}
            className={`${lang == l ? 'flag-active mx-2' : 'mx-2'}`}
            onClick={onClick}
          >
            <Flag width="22" height="22" viewBox="0 0 500 500" />
          </div>
        );
      })}
    </div>
  </div>
);

const LanguageSelect = ({ showMenu, setShowMenu }) => {
  const { isMobile, lang, changeLang } = useApp();

  const languages = {
    'en-EN': FlagEn,
    'es-ES': FlagEs,
    'fr-FR': FlagFr,
    'pt-PT': FlagBr,
  };

  const SelectedFlag = languages[lang];

  const onClick = () => {
    changeLang(l);
    setShowMenu(false);
  };

  return (
    <>
      {isMobile ? (
        <div>
          <LanguagesMenu languages={languages} lang={lang} onClick={onClick} />
        </div>
      ) : (
        <>
          <div
            className="flex items-center relative px-3"
            onClick={() => setShowMenu(!showMenu)}
          >
            <SelectedFlag width="18" height="18" viewBox="0 0 500 500" />
            {showMenu && (
              <div className="absolute top-2 bg-black">
                <LanguagesMenu
                  languages={languages}
                  lang={lang}
                  onClick={onClick}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default LanguageSelect;
