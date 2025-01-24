import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Menu } from '@headlessui/react';

const MenuItems = ({ divided, children }) => {
  return (
    <Menu.Items
      className={twMerge(
        'border-borderThird bg-bgButton dark:border-borderThirdDark dark:bg-bgButtonDark absolute top-10 right-0 z-10 rounded-sm border py-1',
        divided && 'divide-borderPrimary dark:divide-borderPrimaryDark divide-y',
      )}
    >
      {children}
    </Menu.Items>
  );
};

export default MenuItems;
