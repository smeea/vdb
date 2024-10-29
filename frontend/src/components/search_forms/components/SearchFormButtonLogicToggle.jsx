import React from 'react';
import { Button } from '@/components';
import { AND, NOT, OR, ONLY } from '@/utils/constants';
import Exclamation from '@/assets/images/icons/exclamation.svg?react';

const SearchFormButtonLogicToggle = ({ name, i, value, searchForm, withAnd, withOnly }) => {
  const handleToggleForm = () => {
    if (name === 'text') {
      switch (value) {
        case AND:
          searchForm[name][i].logic = NOT;
          break;
        case NOT:
          searchForm[name][i].logic = AND;
          break;
      }
    } else {
      switch (value) {
        case OR:
          searchForm[name].logic = withAnd ? AND : NOT;
          break;
        case AND:
          searchForm[name].logic = NOT;
          break;
        case NOT:
          searchForm[name].logic = withOnly ? ONLY : OR;
          break;
        case ONLY:
          searchForm[name].logic = OR;
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
