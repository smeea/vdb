import React from 'react';
import PcDisplay from '@icons/pc-display.svg?react';
import SunFill from '@icons/sun-fill.svg?react';
import MoonFill from '@icons/moon-fill.svg?react';
import { useApp, useTheme } from '@/context';
import { NAME } from '@/constants';

const ThemeSelect = ({ setShowMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { isMobile } = useApp();

  const handleClick = () => {
    toggleTheme();
    isMobile && setShowMenu(false);
  };

  const themeVisual = {
    auto: {
      icon: (
        <PcDisplay
          width={isMobile ? '20' : '16'}
          height={isMobile ? '20' : '16'}
          viewBox="0 0 16 16"
        />
      ),
      name: 'System Theme',
    },
    dark: {
      icon: (
        <MoonFill
          width={isMobile ? '20' : '16'}
          height={isMobile ? '20' : '16'}
          viewBox="0 0 16 16"
        />
      ),
      name: 'Dark Theme',
    },
    light: {
      icon: (
        <SunFill
          width={isMobile ? '20' : '16'}
          height={isMobile ? '20' : '16'}
          viewBox="0 0 16 16"
        />
      ),
      name: 'Light Theme',
    },
  };

  return (
    <>
      {isMobile ? (
        <div
          className="flex items-center gap-2 px-3 py-1.5 text-fgThird dark:text-fgPrimaryDark"
          onClick={handleClick}
        >
          <div className="flex min-w-[30px] justify-center">{themeVisual[theme]?.icon}</div>
          <div className="whitespace-nowrap">{themeVisual[theme]?.[NAME]}</div>
        </div>
      ) : (
        <div
          className="flex h-full min-w-[40px] items-center justify-center text-white hover:cursor-pointer dark:text-white"
          onClick={handleClick}
          title="Switch Theme"
        >
          {themeVisual[theme]?.icon}
        </div>
      )}
    </>
  );
};

export default ThemeSelect;
