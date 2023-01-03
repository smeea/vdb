import React from 'react';
import { Menu } from '@headlessui/react';

const MenuButton = ({ title, icon, variant = 'primary', text }) => {
  const getStyle = (variant) => {
    switch (variant) {
      case 'primary':
        return 'text-fgThird dark:text-fgThirdDark bg-bgButton dark:bg-bgButtonDark border border-borderSecondary dark:border-borderSecondaryDark disabled:opacity-40 disabled:text-fgPrimary dark:disabled:text-fgPrimaryDark';
      case 'secondary':
        return 'text-fgThird dark:text-fgThirdDark bg-bgButtonSecondary dark:bg-bgButtonSecondaryDark border border-borderThird dark:border-borderThirdDark';
    }
  };

  const baseStyle =
    'focus:outline outline-2 outline-bgCheckboxSelected dark:outline-bgCheckboxSelectedDark';

  const customStyle = getStyle(variant);

  return (
    <Menu.Button className="block w-full h-full rounded outline-2 outline-bgCheckboxSelected focus:outline dark:outline-bgCheckboxSelectedDark">
      <div
        className={`${baseStyle} ${customStyle} flex h-full items-center justify-center space-x-2 rounded px-3 py-1.5`}
        title={title}
      >
        {icon}
        {text && <div>{text}</div>}
      </div>
    </Menu.Button>
  );
};

export default MenuButton;
