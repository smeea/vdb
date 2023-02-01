import React from 'react';
import { Menu } from '@headlessui/react';

const MenuItem = ({ children }) => {
  return (
    <Menu.Item className="whitespace-nowrap px-3 py-1.5 hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark">
      {children}
    </Menu.Item>
  );
};

export default MenuItem;
