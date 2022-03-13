import React from 'react';
import { Button } from 'react-bootstrap';
import Plus from 'assets/images/icons/plus.svg';

const SearchFormButtonAddText = (props) => {
  const addForm = () => {
    props.setFormState((prevState) => {
      const v = prevState.text;
      v.push({ value: '', regex: false, inText: false });

      return {
        ...prevState,
        text: v,
      };
    });
  };

  return (
    <Button className="multi-form" variant="primary" onClick={() => addForm()}>
      <Plus />
    </Button>
  );
};

export default SearchFormButtonAddText;
