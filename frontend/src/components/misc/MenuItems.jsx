import React from 'react';
import { Menu } from '@headlessui/react';

const MenuItems = ({ children }) => {
  return (
    <Menu.Items className="absolute z-10 top-10 right-0 rounded bg-bgButton py-2 dark:bg-bgButtonDark">
      {children}
    </Menu.Items>
  );
};

export default MenuItems;
