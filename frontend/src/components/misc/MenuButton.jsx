import React from 'react';
import { Menu } from '@headlessui/react';
import { ButtonIconed } from 'components';

const MenuButton = ({ title, icon, variant = 'primary', text }) => {
  const btnVariant = `btn-${variant}`;

  return (
    <Menu.Button>
      <div className={`rounded bg-red-800 ${btnVariant}`} title={title}>
        {text === undefined || text === null ? (
          <>{icon}</>
        ) : (
          <div className="flex items-center justify-center">
            <div className="flex ">{icon}</div>
            {text}
          </div>
        )}
      </div>
    </Menu.Button>
  );
};

export default MenuButton;
