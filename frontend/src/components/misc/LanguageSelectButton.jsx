import React from 'react';
import { Flag, LanguageMenu } from '@/components';
import { useApp } from '@/context';

const LanguageSelectButton = ({ showMenu, setShowMenu }) => {
  const { lang } = useApp();

  return (
    <div
      className="relative flex h-full min-w-[40px] items-center justify-center"
      onClick={() => setShowMenu(!showMenu)}
      title="Select Language"
    >
      <Flag value={lang} />
      {showMenu && (
        <div className="absolute left-1 top-11 rounded border border-borderPrimary bg-bgPrimary p-3 dark:border-borderPrimaryDark dark:bg-bgPrimaryDark">
          <LanguageMenu setShowMenu={setShowMenu} />
        </div>
      )}
    </div>
  );
};

export default LanguageSelectButton;
