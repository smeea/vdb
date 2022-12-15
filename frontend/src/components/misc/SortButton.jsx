import React from 'react';
import { Menu } from '@headlessui/react';
import SortDown from 'assets/images/icons/sort-down.svg';
import { MenuButton } from 'components';

const SortButton = ({ sortMethod, setSortMethod, sortMethods }) => {
  return (
    <Menu>
      <MenuButton
        title="Sort"
        icon={<SortDown />}
        text={sortMethods[sortMethod]}
      />
      <Menu.Items>
        {Object.keys(sortMethods).map((i, index) => {
          return (
            <Menu.Item key={index}>
              <div onClick={() => setSortMethod(i)}>Sort by {i}</div>
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default SortButton;
