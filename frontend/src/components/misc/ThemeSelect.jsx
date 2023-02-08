import React from 'react';
import PcDisplay from '@/assets/images/icons/pc-display.svg';
import SunFill from '@/assets/images/icons/sun-fill.svg';
import MoonFill from '@/assets/images/icons/moon-fill.svg';
import { useApp, useTheme } from '@/context';

const ThemeSelect = ({ setShowMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { isMobile } = useApp();

  const handleClick = () => {
    toggleTheme();
    isMobile && setShowMenu(false);
  };

  return (
    <>
      {isMobile ? (
        <div
          className="flex items-center space-x-2 px-3 py-1.5 sm:text-white sm:dark:text-white"
          onClick={handleClick}
        >
          <div className="flex min-w-[30px] justify-center">
            {theme === 'dark' && (
              <MoonFill height="20" width="20" viewBox="0 0 16 16" />
            )}
            {theme === 'light' && (
              <SunFill height="20" width="20" viewBox="0 0 16 16" />
            )}
            {theme === 'auto' && (
              <PcDisplay height="20" width="20" viewBox="0 0 16 16" />
            )}
          </div>
          <div className="whitespace-nowrap ">
            {theme === 'dark' && 'Dark Theme'}
            {theme === 'light' && 'Light Theme'}
            {theme === 'auto' && 'System Theme'}
          </div>
        </div>
      ) : (
        <div
          className="flex h-full min-w-[40px] items-center justify-center sm:text-white sm:dark:text-white"
          onClick={handleClick}
        >
          {theme === 'dark' && <MoonFill />}
          {theme === 'light' && <SunFill />}
          {theme === 'auto' && <PcDisplay />}
        </div>
      )}
    </>
  );
};

export default ThemeSelect;
