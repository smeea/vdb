import React from 'react';
import CloudSunFill from 'assets/images/icons/cloud-sun-fill.svg';
import SunFill from 'assets/images/icons/sun-fill.svg';
import MoonFill from 'assets/images/icons/moon-fill.svg';
import { useApp, useTheme } from 'context';

const ThemeSelect = ({ setShowMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { isMobile } = useApp();

  return (
    <div
      className={`d-flex ${
        isMobile ? 'align-items-center' : 'white-font'
      } px-2 py-1 px-md-3`}
      onClick={() => {
        toggleTheme();
        isMobile && setShowMenu(false);
      }}
    >
      {theme === 'dark' &&
        (isMobile ? (
          <MoonFill height="20" width="20" viewBox="0 0 16 16" />
        ) : (
          <MoonFill />
        ))}
      {theme === 'light' &&
        (isMobile ? (
          <SunFill height="20" width="20" viewBox="0 0 16 16" />
        ) : (
          <SunFill />
        ))}
      {theme !== 'dark' &&
        theme !== 'light' &&
        (isMobile ? (
          <>
            <CloudSunFill height="20" width="20" viewBox="0 0 16 16" />
          </>
        ) : (
          <>
            <CloudSunFill /> <small>A</small>
          </>
        ))}
      {isMobile && (
        <div className="ps-2">
          {theme === 'dark' && 'Dark Theme'}
          {theme === 'light' && 'Light Theme'}
          {theme !== 'dark' && theme !== 'light' && 'System Theme'}
        </div>
      )}
    </div>
  );
};

export default ThemeSelect;
