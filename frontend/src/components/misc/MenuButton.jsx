import React from 'react';
import { Menu } from '@headlessui/react';
import { ButtonIconed } from 'components';

const MenuButton = ({ title, icon, variant = 'primary', text }) => {
  const btnVariant = `btn-${variant}`;

  return (
    <Menu.Button>
      <div className={`p-1.5 rounded bg-red-800 ${btnVariant}`} title={title}>
        {text === undefined || text === null ? (
          <>{icon}</>
        ) : (
          <div className="flex items-center justify-center">
            <div className="pr-2 flex">{icon}</div>
            {text}
          </div>
        )}
      </div>
    </Menu.Button>
  );
};

export default MenuButton;
