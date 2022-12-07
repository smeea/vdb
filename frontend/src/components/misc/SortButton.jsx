import React from 'react';
import { Menu } from '@headlessui/react';
import SortDown from 'assets/images/icons/sort-down.svg';

const SortButton = ({ sortMethod, setSortMethod, sortMethods }) => {
  return (
    <Menu>
      <Menu.Button title="Sort Crypt" variant="primary">
        <div className="flex justify-center items-center">
          <div className="flex pe-1">
            <SortDown />
          </div>
          {sortMethods[sortMethod]}
        </div>
      </Menu.Button>
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
