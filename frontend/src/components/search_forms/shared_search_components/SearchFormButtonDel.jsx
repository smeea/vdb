import React from 'react';
import Dash from 'assets/images/icons/dash.svg';
import { Button } from 'components';

const SearchFormButtonDel = ({ i, name, searchForm }) => {
  const delForm = (n) => {
    if (name) {
      searchForm[name].value.splice(n, 1);
    } else {
      searchForm.text.splice(n, 1);
    }
  };

  return (
    <Button
      className="w-[18px] h-[18px] px-0 py-0"
      variant="primary"
      onClick={() => delForm(i)}
    >
      <Dash />
    </Button>
  );
};

export default SearchFormButtonDel;
