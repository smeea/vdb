import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import FilterLeft from '../../assets/images/icons/filter-left.svg';

function ResultCryptSortForm(props) {
  const sortMethods = ['Default', 'Name', 'Capacity', 'Clan', 'Group'];

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
      title={<FilterLeft />}
    >
      {SortButtonOptions}
    </DropdownButton>
  );
}

export default ResultCryptSortForm;
