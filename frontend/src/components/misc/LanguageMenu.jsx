import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Flag } from '@/components';
import { useApp } from '@/context';
import { EN, ES, FR, PT } from '@/constants';

const LanguageMenu = ({ handleClose }) => {
  const { lang, changeLang } = useApp();
  const languages = [EN, ES, FR, PT];

  const handleClick = (l) => {
    changeLang(l);
    handleClose();
  };

  return (
    <div className="flex flex-col gap-2">
      <div>Card Language:</div>
      <div className="flex items-center gap-5">
        {languages.map((l) => {
          return (
            <div
              key={l}
              className={twMerge(
                'cursor-pointer',
                lang == l &&
                  'rounded-full border-4 border-double border-fgSecondary dark:border-fgSecondaryDark',
              )}
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
