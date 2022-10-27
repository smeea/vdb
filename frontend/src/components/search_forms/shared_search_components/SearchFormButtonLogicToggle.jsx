import React from 'react';
import { Button } from 'react-bootstrap';
import Exclamation from 'assets/images/icons/exclamation.svg';

const SearchFormButtonLogicToggle = ({ name, value, searchForm, withAnd }) => {
  const handleToggleForm = () => {
    if (name === 'text') {
      switch (value) {
        case 'and':
          searchForm[name].logic = 'not';
          break;
        case 'not':
          searchForm[name].logic = 'and';
          break;
      }
    } else {
      switch (value) {
        case 'or':
          searchForm[name].logic = withAnd ? 'and' : 'not';
        case 'and':
          searchForm[name].logic = 'not';
          break;
        case 'not':
          logic = 'or';
          searchForm[name].logic = 'or';
          break;
      }
    }
  };

  let icon = '';
  let title = '';

  switch (value) {
    case 'and':
      icon = '&';
      title = 'Logic: AND';
      break;
    case 'or':
      icon = '//';
      title = 'Logic: OR';
      break;
    case 'not':
      icon = <Exclamation />;
      title = 'Logic: NOT';
      break;
  }

  return (
    <Button
      className="multi-form"
      variant="primary"
      onClick={() => handleToggleForm()}
      title={title}
    >
      {icon}
    </Button>
  );
};

export default SearchFormButtonLogicToggle;
