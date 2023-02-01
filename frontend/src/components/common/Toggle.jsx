import React from 'react';
import ToggleOn from '@/assets/images/icons/toggle-on.svg';
import ToggleOff from '@/assets/images/icons/toggle-off.svg';

const Toggle = ({ isOn, toggle, size = 'md', disabled = false, children }) => {
  const getSize = (size) => {
    switch (size) {
      case 'sm':
        return '22';
      case 'md':
        return '26';
      case 'lg':
        return '30';
    }
  };

  const customSize = getSize(size);
  ('focus:outline outline-2 outline-bgCheckboxSelected dark:outline-bgCheckboxSelectedDark');

  return (
    <div
      className={`flex items-center space-x-2 ${
        !disabled && isOn ? '' : 'text-midGray dark:text-midGrayDark'
      }`}
      onClick={() => !disabled && toggle()}
    >
      {isOn ? (
        <ToggleOn width={customSize} height={customSize} viewBox="0 0 16 16" />
      ) : (
        <ToggleOff width={customSize} height={customSize} viewBox="0 0 16 16" />
      )}
      <div className="flex items-center">
        {children}
      </div>
    </div>
  );
};

export default Toggle;
