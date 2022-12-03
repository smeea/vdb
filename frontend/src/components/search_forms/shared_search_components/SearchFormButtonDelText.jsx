import React from 'react';
import Dash from 'assets/images/icons/dash.svg';
import { Button } from 'components';

const SearchFormButtonDelText = ({ i, searchForm }) => {
  const delForm = (n) => {
    searchForm.text.splice(n, 1);
  };

  return (
    <Button className="multi-form" variant="primary" onClick={() => delForm(i)}>
      <Dash />
    </Button>
  );
};

export default SearchFormButtonDelText;
