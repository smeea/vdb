import React from 'react';
import { Button } from 'components';
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
    <Button
      className="h-[18px] w-[18px] px-0 py-0"
      variant="primary"
      onClick={addForm}
    >
      <Plus />
    </Button>
  );
};

export default SearchFormButtonAddText;
