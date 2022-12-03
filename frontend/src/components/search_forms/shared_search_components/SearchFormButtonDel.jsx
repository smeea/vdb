import React from 'react';
import Dash from 'assets/images/icons/dash.svg';
import { Button } from 'components';

const SearchFormButtonDel = ({ i, name, searchForm }) => {
  const delForm = (n) => {
    searchForm[name].value.splice(n, 1);
  };

  return (
    <Button className="multi-form" variant="primary" onClick={() => delForm(i)}>
      <Dash />
    </Button>
  );
};

export default SearchFormButtonDel;
