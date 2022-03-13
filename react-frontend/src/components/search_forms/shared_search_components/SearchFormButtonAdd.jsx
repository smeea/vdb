import React from 'react';
import { Button } from 'react-bootstrap';
import Plus from 'assets/images/icons/plus.svg';

const SearchFormButtonAdd = (props) => {
  const addForm = () => {
    props.setFormState((prevState) => {
      const name = props.value.name;
      const v = prevState[name].value;
      v.push('any');

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
    <Button className="multi-form" variant="primary" onClick={() => addForm()}>
      <Plus />
    </Button>
  );
};

export default SearchFormButtonAdd;
