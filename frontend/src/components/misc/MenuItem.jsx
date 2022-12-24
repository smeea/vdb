import React from 'react';
import { Menu } from '@headlessui/react';

const MenuItem = ({ children }) => {
  return (
    <Menu.Item className="whitespace-nowrap hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark px-3 py-1.5">
      {children}
    </Menu.Item>
  );
};

export default MenuItem;
