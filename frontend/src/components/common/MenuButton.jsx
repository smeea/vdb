import React from 'react';
import { Menu } from '@headlessui/react';

const MenuButton = ({ title, icon, variant = 'primary', text }) => {
  const outlineStyle =
    'rounded outline-bgCheckboxSelected focus:outline outline-1 dark:outline-bgCheckboxSelectedDark';

  const customStyle = {
    primary:
      'text-fgThird dark:text-fgThirdDark bg-bgButton dark:bg-bgButtonDark border border-borderSecondary dark:border-borderSecondaryDark disabled:opacity-40 disabled:text-fgPrimary dark:disabled:text-fgPrimaryDark border',
    secondary:
      'text-fgThird dark:text-fgThirdDark bg-bgButtonSecondary dark:bg-bgButtonSecondaryDark border-borderThird dark:border-borderThirdDark hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark border hover:border-bgBorderPrimary dark:hover:border-bgBorderPrimaryDark',
  };

  return (
    <Menu.Button className={`block h-full w-full ${outlineStyle}`}>
      <div
        className={`${customStyle[variant]} flex h-full items-center justify-center space-x-2 rounded px-3 py-1.5`}
        title={title}
      >
        {icon}
        {text && <div>{text}</div>}
      </div>
    </Menu.Button>
  );
};

export default MenuButton;
