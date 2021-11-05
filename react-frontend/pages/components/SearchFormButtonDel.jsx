import React from 'react';
import Dash from '../../assets/images/icons/dash.svg';
import { Button } from 'react-bootstrap';

const SearchFormButtonDel = (props) => {
  const delForm = (i) => {
    props.setFormState((prevState) => {
      const name = props.value.name;
      const v = prevState[name].value;
      v.splice(i, 1);
      return {
        ...prevState,
        [name]: {
          ...prevState[name],
          value: v,
        },
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

export default SearchFormButtonDel;
