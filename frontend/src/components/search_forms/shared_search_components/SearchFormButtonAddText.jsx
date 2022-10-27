import React from 'react';
import { Button } from 'react-bootstrap';
import Plus from 'assets/images/icons/plus.svg';

const SearchFormButtonAddText = ({ searchForm }) => {
  const addForm = () => {
    searchForm.text.push({
      value: '',
      regex: false,
      inText: false,
      logic: 'and',
    });
  };

  return (
    <Button className="multi-form" variant="primary" onClick={() => addForm()}>
      <Plus />
    </Button>
  );
};

export default SearchFormButtonAddText;
