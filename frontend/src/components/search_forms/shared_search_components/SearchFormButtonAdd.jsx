import React from 'react';
import { Button } from 'components';
import Plus from 'assets/images/icons/plus.svg';

const SearchFormButtonAdd = ({ name, searchForm, withMoreless }) => {
  const addForm = () => {
    if (withMoreless) {
      searchForm[name].value.push({ capacity: 'any', moreless: 'le' });
    } else {
      searchForm[name].value.push('any');
    }
  };

  return (
    <Button
      className="w-[18px] h-[18px] px-0 py-0"
      variant="primary"
      onClick={() => addForm()}
    >
      <Plus />
    </Button>
  );
};

export default SearchFormButtonAdd;
