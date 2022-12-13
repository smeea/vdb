import React from 'react';
import { Menu } from '@headlessui/react';
import { ButtonIconed } from 'components';

const MenuButton = ({ title, icon, variant = 'primary', text }) => {
  const btnVariant = `btn-${variant}`;

  return (
    <Menu.Button>
      <div
        className={`flex h-full items-center justify-center rounded bg-red-800 px-3 py-1.5 ${btnVariant}`}
        title={title}
      >
        {text === undefined || text === null ? (
          <>{icon}</>
        ) : (
          <>
            <div className="flex pr-2">{icon}</div>
            {text}
          </>
        )}
      </div>
    </Menu.Button>
  );
};

export default MenuButton;
