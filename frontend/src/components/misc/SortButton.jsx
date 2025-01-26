import React from 'react';
import { Menu } from '@headlessui/react';
import SortDown from '@icons/sort-down.svg?react';
import { MenuItems, MenuItem, MenuButton } from '@/components';
import { capitalize } from '@/utils';

const RelativeDiv = (props) => {
  return <div className="relative" {...props} />;
};

const SortButton = ({ sortMethod, setSortMethod, sortMethods, noText, className }) => {
  return (
    <Menu as={RelativeDiv}>
      <MenuButton
        className={className}
        title="Sort"
        icon={<SortDown />}
        text={
          !noText && <div className="whitespace-nowrap">{capitalize(sortMethods[sortMethod])}</div>
        }
      />
      <MenuItems>
        {Object.keys(sortMethods).map((i) => {
          return (
            <MenuItem key={i} onClick={() => setSortMethod(i)}>
              Sort by {capitalize(i)}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};

export default SortButton;
