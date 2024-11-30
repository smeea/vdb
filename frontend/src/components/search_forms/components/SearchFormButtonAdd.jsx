import React from 'react';
import { Button } from '@/components';
import Plus from '@icons/plus.svg?react';
import { ANY, LE } from '@/constants';

const SearchFormButtonAdd = ({ name, searchForm, withMoreless }) => {
  const addForm = () => {
    if (withMoreless) {
      searchForm[name].value.push({ capacity: ANY, moreless: LE });
    } else {
      searchForm[name].value.push(ANY);
    }
  };

  return (
    <Button className="h-[18px] w-[18px]" onClick={addForm} noPadding>
      <Plus />
    </Button>
  );
};

export default SearchFormButtonAdd;
