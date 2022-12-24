import React from 'react';
import { Menu } from '@headlessui/react';

const MenuItems = ({ children }) => {
  return (
    <Menu.Items className="absolute top-10 right-0 rounded py-2 bg-bgButton dark:bg-bgButtonDark">
      {children}
    </Menu.Items>
  );
};

export default MenuItems;
