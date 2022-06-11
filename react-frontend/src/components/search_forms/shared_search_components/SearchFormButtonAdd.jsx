import React from 'react';
import { Button } from 'react-bootstrap';
import Plus from 'assets/images/icons/plus.svg';

const SearchFormButtonAdd = ({ value, setFormState, withMoreless }) => {
  const addForm = () => {
    setFormState((prevState) => {
      const name = value.name;
      const v = prevState[name].value;
      if (withMoreless) {
        v.push({ capacity: 'any', moreless: 'le' });
      } else {
        v.push('any');
      }

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
