import React from 'react';
import { Menu } from '@headlessui/react';

const MenuButton = ({ title, icon, variant = 'primary', text }) => {
  const baseStyle =
    'focus:outline outline-2 outline-bgCheckboxSelected dark:outline-bgCheckboxSelectedDark';

  const customStyle = {
    primary:
      'text-fgThird dark:text-fgThirdDark bg-bgButton dark:bg-bgButtonDark border border-borderSecondary dark:border-borderSecondaryDark disabled:opacity-40 disabled:text-fgPrimary dark:disabled:text-fgPrimaryDark',
    secondary:
      'text-fgThird dark:text-fgThirdDark bg-bgButtonSecondary dark:bg-bgButtonSecondaryDark border border-borderThird dark:border-borderThirdDark',
  };

  return (
    <Menu.Button className="block h-full w-full rounded outline-2 outline-bgCheckboxSelected focus:outline dark:outline-bgCheckboxSelectedDark">
      <div
        className={`${baseStyle} ${customStyle[variant]} flex h-full items-center justify-center space-x-2 rounded px-3 py-1.5`}
        title={title}
      >
        {icon}
        {text && <div>{text}</div>}
      </div>
    </Menu.Button>
  );
};

export default MenuButton;
