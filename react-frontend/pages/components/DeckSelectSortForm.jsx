import React from 'react';
import { Dropdown, Button, BlockButton } from 'react-bootstrap';
import SortDown from '../../assets/images/icons/sort-down.svg';

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
    <Dropdown title="Sort Decks" className="d-inline pe-1">
      <Dropdown.Toggle
        as={props.noText ? Button : BlockButton}
        variant="primary"
      >
        <div className="d-flex justify-content-center align-items-center">
          <SortDown />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>{Options}</Dropdown.Menu>
    </Dropdown>
  );
}

export default DeckSelectSortForm;
