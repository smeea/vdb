import React from 'react';
import Dash from 'assets/images/icons/dash.svg';
import { Button } from 'react-bootstrap';

const SearchFormButtonDelText = (props) => {
  const delForm = (i) => {
    props.setFormState((prevState) => {
      const v = prevState.text;
      v.splice(i, 1);
      return {
        ...prevState,
        text: v,
      };
    });
  };

  return (
    <Button
      className="add-form"
      variant="primary"
      onClick={() => delForm(props.i)}
    >
      <Dash />
    </Button>
  );
};

export default SearchFormButtonDelText;
