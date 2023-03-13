import React from 'react';
import { Button } from '@/components';
import Plus from '@/assets/images/icons/plus.svg';

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
      className="h-[18px] w-[18px]"
      variant="primary"
      onClick={addForm}
      noPadding
    >
      <Plus />
    </Button>
  );
};

export default SearchFormButtonAdd;
