import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import SortDown from '../../assets/images/icons/sort-down.svg';

function ResultCryptSortForm(props) {
  const sortMethods = [
    'Name',
    'Clan',
    'Group',
    'Capacity - Min to Max',
    'Capacity - Max to Min',
  ];

  const SortButtonOptions = sortMethods.map((i, index) => {
    return (
      <Dropdown.Item key={index} href="" onClick={() => props.onChange(i)}>
        Sort by {i}
      </Dropdown.Item>
    );
  });

  return (
    <DropdownButton
      variant="outline-secondary"
      id="sort-button"
      title={<SortDown />}
    >
      {SortButtonOptions}
    </DropdownButton>
  );
}

export default ResultCryptSortForm;
