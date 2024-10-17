import React from 'react';
import { twMerge } from 'tailwind-merge';
import ToggleOn from '@/assets/images/icons/toggle-on.svg?react';
import ToggleOff from '@/assets/images/icons/toggle-off.svg?react';

const NavMobileToggleSwitch = ({ text, isOn, onToggle }) => {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 text-fgThird dark:text-fgPrimaryDark"
      onClick={onToggle}
    >
      <div className="flex min-w-[30px] justify-center">
        {isOn ? (
          <ToggleOn height="26" width="26" viewBox="0 0 16 16" />
        ) : (
          <ToggleOff height="26" width="26" viewBox="0 0 16 16" />
        )}
      </div>
      <div className={twMerge('whitespace-nowrap', !isOn && 'text-midGray dark:text-midGrayDark')}>
        {text}
      </div>
    </div>
  );
};

export default NavMobileToggleSwitch;
