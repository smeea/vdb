import React from 'react';
import { Menu } from '@headlessui/react';

const MenuButton = ({ title, icon, variant = 'primary', text }) => {
  const btnVariant = `btn-${variant}`;

  return (
    <Menu.Button>
      <div
        className={`bg-red-800 flex h-full items-center justify-center space-x-2 rounded px-3 py-1.5 ${btnVariant}`}
        title={title}
      >
        {icon}
        {text && <div>{text}</div>}
      </div>
    </Menu.Button>
  );
};

export default MenuButton;
