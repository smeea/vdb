import React from 'react';
import { Menu } from '@headlessui/react';
import SortDown from 'assets/images/icons/sort-down.svg';

const DeckSelectSortForm = ({ onChange }) => {
  const sortMethods = { Name: 'byName', Date: 'byDate' };

  return (
    <Menu>
      <Menu.Button>
        {/* variant="primary" */}
        <div title="Sort Decks" className="flex items-center justify-center">
          <SortDown />
        </div>
      </Menu.Button>
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
