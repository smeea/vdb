import React from 'react';
import { Menu } from '@headlessui/react';
import SortDown from '@/assets/images/icons/sort-down.svg';
import { MenuItems, MenuItem, MenuButton } from '@/components';

const DeckSelectSortForm = ({ value, onChange }) => {
  const sortMethods = { Name: 'byName', Date: 'byDate' };

  return (
    <Menu as="div" className="relative">
      <MenuButton
        title="Sort Decks"
        icon={<SortDown />}
        text={value ? value.replace('by', '') : null}
      />
      <MenuItems>
        {Object.keys(sortMethods).map((k) => {
          return (
            <MenuItem key={k}>
              <div onClick={() => onChange(sortMethods[k])}>Sort by {k}</div>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};

export default DeckSelectSortForm;
