import React from 'react';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import SortDown from 'assets/images/icons/sort-down.svg';

const DeckSelectSortForm = ({ onChange }) => {
  const sortMethods = { Name: 'byName', Date: 'byDate' };

  const Options = Object.keys(sortMethods).map((k) => {
    return (
      <Dropdown.Item key={k} onClick={() => onChange(sortMethods[k])}>
        Sort by {k}
      </Dropdown.Item>
    );
  });

  return (
    <DropdownButton
      as={ButtonGroup}
      variant="primary"
      title={
        <div title="Sort Decks" className="flex justify-center items-center">
          <SortDown />
        </div>
      }
    >
      {Options}
    </DropdownButton>
  );
};

export default DeckSelectSortForm;
