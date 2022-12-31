import React from 'react';
import FlagEn from 'assets/images/flags/en.svg';
import FlagEs from 'assets/images/flags/es.svg';
import FlagFr from 'assets/images/flags/fr.svg';
import FlagBr from 'assets/images/flags/br.svg';
import { LanguageMenu } from 'components';
import { useApp } from 'context';

const LanguageSelect = ({ showMenu, setShowMenu }) => {
  const { isMobile, lang } = useApp();

  const languages = {
    'en-EN': FlagEn,
    'es-ES': FlagEs,
    'fr-FR': FlagFr,
    'pt-PT': FlagBr,
  };
  const SelectedFlag = languages[lang];

  return (
    <>
      {isMobile ? (
        <LanguageMenu languages={languages} setShowMenu={setShowMenu} />
      ) : (
        <div
          className="relative flex h-full min-w-[40px] items-center justify-center"
          onClick={() => setShowMenu(!showMenu)}
        >
          <SelectedFlag width="18" height="18" viewBox="0 0 500 500" />
          {showMenu && (
            <div className="bg-black absolute left-1 top-11 rounded border border-borderPrimary dark:border-borderPrimaryDark p-3">
              <LanguageMenu languages={languages} setShowMenu={setShowMenu} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LanguageSelect;
