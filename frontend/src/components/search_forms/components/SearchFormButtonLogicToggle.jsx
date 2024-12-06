import React from 'react';
import { Button } from '@/components';
import { LOGIC, TEXT, AND, NOT, OR, ONLY } from '@/constants';
import Exclamation from '@icons/exclamation.svg?react';

const SearchFormButtonLogicToggle = ({ name, i, value, searchForm, withAnd, withOnly }) => {
  const handleToggleForm = () => {
    if (name === TEXT) {
      switch (value) {
        case AND:
          searchForm[name][i][LOGIC] = NOT;
          break;
        case NOT:
          searchForm[name][i][LOGIC] = AND;
          break;
      }
    } else {
      switch (value) {
        case OR:
          searchForm[name][LOGIC] = withAnd ? AND : NOT;
          break;
        case AND:
          searchForm[name][LOGIC] = NOT;
          break;
        case NOT:
          searchForm[name][LOGIC] = withOnly ? ONLY : OR;
          break;
        case ONLY:
          searchForm[name][LOGIC] = OR;
          break;
      }
    }
  };

  let icon = '';
  let title = '';

  switch (value) {
    case AND:
      icon = '&';
      title = 'Logic: AND';
      break;
    case OR:
      icon = '//';
      title = 'Logic: OR';
      break;
    case NOT:
      icon = <Exclamation />;
      title = 'Logic: NOT';
      break;
    case ONLY:
      icon = '≡';
      title = 'Logic: ONLY';
      break;
  }

  return (
    <Button
      className="h-[18px] w-[18px] text-[10px]"
      onClick={handleToggleForm}
      title={title}
      noPadding
    >
      {icon}
    </Button>
  );
};

export default SearchFormButtonLogicToggle;
