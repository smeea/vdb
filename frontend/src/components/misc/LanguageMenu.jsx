import React from 'react';
import FlagEn from 'assets/images/flags/en.svg';
import FlagEs from 'assets/images/flags/es.svg';
import FlagFr from 'assets/images/flags/fr.svg';
import FlagBr from 'assets/images/flags/br.svg';
import { useApp } from 'context';

const LanguageMenu = ({ setShowMenu }) => {
  const { lang, changeLang } = useApp();

  const languages = {
    'en-EN': FlagEn,
    'es-ES': FlagEs,
    'fr-FR': FlagFr,
    'pt-PT': FlagBr,
  };

  const onClick = (l) => {
    changeLang(l);
    setShowMenu(false);
  };

  return (
    <div className="space-y-2">
      <div>Card Language:</div>
      <div className="flex items-center space-x-5">
        {Object.keys(languages).map((l) => {
          const Flag = languages[l];
          return (
            <div
              key={l}
              className={`${
                lang == l
                  ? 'rounded-full border-4 border-borderPrimary dark:border-borderPrimaryDark'
                  : ''
              }`}
              onClick={() => onClick(l)}
            >
              <Flag width="22" height="22" viewBox="0 0 500 500" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageMenu;
