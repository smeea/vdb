import React from 'react';
import { useApp } from 'context';

const LanguageMenu = ({ languages, setShowMenu }) => {
  const { lang, changeLang } = useApp();

  const onClick = (l) => {
    changeLang(l);
    setShowMenu(false);
  };

  return (
    <div className="space-y-2">
      <div className="text-sm">Card Language:</div>
      <div className="flex items-center space-x-3">
        {Object.keys(languages).map((l) => {
          const Flag = languages[l];
          return (
            <div
              key={l}
              className={`${
                lang == l ? 'rounded-[16px] border-[3px] border-[#606080]' : ''
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
