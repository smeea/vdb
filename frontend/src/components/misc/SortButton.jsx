import React from 'react';
import { Menu } from '@headlessui/react';
import SortDown from '@/assets/images/icons/sort-down.svg?react';
import { MenuItems, MenuItem, MenuButton } from '@/components';

const RelativeDiv = React.forwardRef((props, ref) => {
  return <div className="relative" ref={ref} {...props} />;
});
RelativeDiv.displayName = 'RelativeDiv';

const SortButton = ({ sortMethod, setSortMethod, sortMethods, className = '' }) => {
  return (
    <Menu as={RelativeDiv}>
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
