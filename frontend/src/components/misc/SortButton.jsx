import React from 'react';
import { Dropdown } from 'react-bootstrap';
import SortDown from 'assets/images/icons/sort-down.svg';

const SortButton = ({ sortMethod, setSortMethod, sortMethods }) => {
  return (
    <Dropdown title="Sort Crypt" className="inline">
      <Dropdown.Toggle variant="primary">
        <div className="flex justify-center items-center">
          <div className="flex pe-1">
            <SortDown />
          </div>
          {sortMethods[sortMethod]}
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(sortMethods).map((i, index) => {
          return (
            <Dropdown.Item key={index} href="" onClick={() => setSortMethod(i)}>
              Sort by {i}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortButton;
