import React from 'react';
import { Menu } from '@headlessui/react';
import SortDown from '@/assets/images/icons/sort-down.svg?react';
import { MenuItems, MenuItem, MenuButton } from '@/components';

const SortButton = ({
  sortMethod,
  setSortMethod,
  sortMethods,
  className = '',
}) => {
  return (
    <Menu as="div">
      <MenuButton
        className={className}
        title="Sort"
        icon={<SortDown />}
        text={sortMethods[sortMethod]}
      />
      <MenuItems>
        {Object.keys(sortMethods).map((i, index) => {
          return (
            <MenuItem key={index} onClick={() => setSortMethod(i)}>
              Sort by {i}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};

export default SortButton;
