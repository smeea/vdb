import React from 'react';
import ToggleOn from '@/assets/images/icons/toggle-on.svg?react';
import ToggleOff from '@/assets/images/icons/toggle-off.svg?react';

const NavToggle = ({ text, isOn, onToggle }) => {
  return (
    <div
      className={`flex h-full items-center space-x-1 ${
        isOn
          ? 'text-white dark:text-whiteDark'
          : 'text-lightGray dark:text-lightGrayDark'
      }`}
      onClick={onToggle}
    >
      <div className="flex min-w-[36px] justify-center">
        {isOn ? (
          <ToggleOn width="26" height="26" viewBox="0 0 16 16" />
        ) : (
          <ToggleOff width="26" height="26" viewBox="0 0 16 16" />
        )}
      </div>
      <div className="pb-[2px]">{text}</div>
    </div>
  );
};

export default NavToggle;
