import React from 'react';
import ToggleOn from '@/assets/images/icons/toggle-on.svg';
import ToggleOff from '@/assets/images/icons/toggle-off.svg';

const Toggle = ({ isOn, toggle, size = 'md', disabled = false, children }) => {
  const customSize = {
    sm: 22,
    md: 26,
    lg: 30,
  };

  return (
    <div
      className={`flex items-center gap-2 ${
        !disabled && isOn ? '' : 'text-midGray dark:text-midGrayDark'
      }`}
      onClick={() => !disabled && toggle()}
    >
      {isOn ? (
        <ToggleOn
          width={customSize[size]}
          height={customSize[size]}
          viewBox="0 0 16 16"
        />
      ) : (
        <ToggleOff
          width={customSize[size]}
          height={customSize[size]}
          viewBox="0 0 16 16"
        />
      )}
      {children && <div className="flex items-center">{children}</div>}
    </div>
  );
};

export default Toggle;
