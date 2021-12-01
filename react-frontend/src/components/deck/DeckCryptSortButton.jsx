import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import SortDown from 'assets/images/icons/sort-down.svg';
import { useApp } from 'context';

function DeckCryptSortButton(props) {
  const { cryptDeckSort, changeCryptDeckSort } = useApp();

  const sortMethods = ['Quantity', 'Capacity', 'Name', 'Group'];

  const Options = sortMethods.map((i, index) => {
    return (
      <Dropdown.Item key={index} href="" onClick={() => changeCryptDeckSort(i)}>
        Sort by {i}
      </Dropdown.Item>
    );
  });

  return (
    <Dropdown title="Sort Crypt" className="d-inline">
      <Dropdown.Toggle as={Button} variant="primary">
        <div className="d-flex justify-content-center align-items-center">
          <div className="pe-1">
            <SortDown />
          </div>
          {cryptDeckSort.substring(0, 1)}
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>{Options}</Dropdown.Menu>
    </Dropdown>
  );
}

export default DeckCryptSortButton;
