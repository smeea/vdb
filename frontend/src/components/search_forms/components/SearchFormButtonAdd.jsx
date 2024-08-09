import React from 'react';
import { Button } from '@/components';
import Plus from '@/assets/images/icons/plus.svg?react';
import { ANY } from '@/utils/constants';

const SearchFormButtonAdd = ({ name, searchForm, withMoreless }) => {
  const addForm = () => {
    if (withMoreless) {
      searchForm[name].value.push({ capacity: ANY, moreless: 'le' });
    } else {
      searchForm[name].value.push(ANY);
    }
  };

  return (
    <Button className="h-[18px] w-[18px]" variant="primary" onClick={addForm} noPadding>
      <Plus />
    </Button>
  );
};

export default SearchFormButtonAdd;
