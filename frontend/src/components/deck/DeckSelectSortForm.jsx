import React from 'react';
import { Menu } from '@headlessui/react';
import SortDown from 'assets/images/icons/sort-down.svg';
import { MenuButton } from 'components';

const DeckSelectSortForm = ({ onChange }) => {
  const sortMethods = { Name: 'byName', Date: 'byDate' };

  return (
    <Menu>
      <MenuButton title="Sort Decks" icon={<SortDown />} text="Public" />
      <Menu.Items>
        {Object.keys(sortMethods).map((k) => {
          return (
            <Menu.Item key={k}>
              <div onClick={() => onChange(sortMethods[k])}>Sort by {k}</div>
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default DeckSelectSortForm;
