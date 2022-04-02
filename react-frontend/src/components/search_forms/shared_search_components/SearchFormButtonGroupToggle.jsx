import React from 'react';
import { Button } from 'react-bootstrap';
import Exclamation from 'assets/images/icons/exclamation.svg';

const SearchFormButtonGroupToggle = (props) => {
  const handleToggleForm = () => {
    const name = props.value.name;
    props.setFormState((prevState) => {
      let newState;

      if (name === 'text') {
        let logic = prevState[name][props.i].logic;
        switch (logic) {
          case 'and':
            logic = 'not';
            break;
          case 'not':
            logic = 'and';
            break;
        }

        newState = [...prevState[name]];
        newState[props.i].logic = logic;
      } else {
        let logic = prevState[name].logic;
        switch (logic) {
          case 'or':
            logic = props.withAnd ? 'and' : 'not';
            break;
          case 'and':
            logic = 'not';
            break;
          case 'not':
            logic = 'or';
            break;
        }

        newState = {
          ...prevState[name],
          logic: logic,
        };
      }

      return {
        ...prevState,
        [name]: newState,
      };
    });
  };

  let icon = '';
  let title = '';

  switch (props.value.logic) {
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

export default SearchFormButtonGroupToggle;
