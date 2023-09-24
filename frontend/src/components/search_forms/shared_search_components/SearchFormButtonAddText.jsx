import React from 'react';
import { Button } from '@/components';
import Plus from '@/assets/images/icons/plus.svg?react';

const SearchFormButtonAddText = ({ searchForm }) => {
  const addForm = () => {
    searchForm.text.push({
      value: '',
      regex: false,
      in: false,
      logic: 'and',
    });
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

export default SearchFormButtonAddText;
