import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import SortDown from 'assets/images/icons/sort-down.svg';

const SortButton = ({ sortMethod, setSortMethod, sortMethods }) => {
  const Options = Object.keys(sortMethods).map((i, index) => {
    return (
      <Dropdown.Item key={index} href="" onClick={() => setSortMethod(i)}>
        Sort by {i}
      </Dropdown.Item>
    );
  });

  return (
    <Dropdown title="Sort Crypt" className="d-inline">
      <Dropdown.Toggle as={Button} variant="primary">
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex pe-1">
            <SortDown />
          </div>
          {sortMethods[sortMethod]}
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>{Options}</Dropdown.Menu>
    </Dropdown>
  );
};

export default SortButton;
