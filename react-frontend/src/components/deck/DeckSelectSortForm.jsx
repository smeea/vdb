import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { ButtonGroup } from 'components';
import SortDown from 'assets/images/icons/sort-down.svg';

function DeckSelectSortForm(props) {
  const sortMethods = { Name: 'byName', Date: 'byDate' };

  const Options = Object.keys(sortMethods).map((k) => {
    return (
      <Dropdown.Item key={k} onClick={() => props.onChange(sortMethods[k])}>
        Sort by {k}
      </Dropdown.Item>
    );
  });

  return (
    <DropdownButton
      as={ButtonGroup}
      variant="primary"
      title={
        <div
          title="Sort Decks"
          className="d-flex justify-content-center align-items-center"
        >
          <SortDown />
        </div>
      }
    >
      {Options}
    </DropdownButton>
  );
}

export default DeckSelectSortForm;
