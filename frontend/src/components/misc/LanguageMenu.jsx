import React from 'react';
import { Flag } from '@/components';
import { useApp } from '@/context';

const LanguageMenu = ({ setShowMenu }) => {
  const { lang, changeLang } = useApp();
  const languages = ['en-EN', 'es-ES', 'fr-FR', 'pt-PT'];

  const handleClick = (l) => {
    changeLang(l);
    setShowMenu(false);
  };

  return (
    <div className="space-y-2">
      <div>Card Language:</div>
      <div className="flex items-center space-x-5">
        {languages.map((l) => {
          return (
            <div
              key={l}
              className={`${
                lang == l
                  ? 'rounded-full border-4 border-double border-fgSecondary dark:border-fgSecondaryDark'
                  : ''
              }`}
              onClick={() => handleClick(l)}
            >
              <Flag size={22} value={l} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageMenu;
