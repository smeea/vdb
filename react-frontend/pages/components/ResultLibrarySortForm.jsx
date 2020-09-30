import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { SortDown } from 'react-bootstrap-icons';

function ResultLibrarySortForm(props) {
  const sortMethods = ['Default', 'Name', 'Clan', 'Discipline', 'Type'];

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
      title={<SortDown size={24} />}
    >
      {SortButtonOptions}
    </DropdownButton>
  );
}

export default ResultLibrarySortForm;
