import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Menu } from '@headlessui/react';

const MenuItems = ({ divided, children }) => {
  return (
    <Menu.Items
      className={twMerge(
        'absolute right-0 top-10 z-10 rounded border border-borderThird bg-bgButton py-1 dark:border-borderThirdDark dark:bg-bgButtonDark',
        divided && 'divide-y divide-borderPrimary dark:divide-borderPrimaryDark',
      )}
    >
      {children}
    </Menu.Items>
  );
};

export default MenuItems;
