import React from 'react';
import { Button } from 'react-bootstrap';
import { Check2, Backspace, Trash } from 'react-bootstrap-icons';

function SearchLibraryFormButtons(props) {
  return (
    <>
      <Button variant='outline-secondary' type='submit'>
        <Check2 size={20} />
      </Button>
      <Button variant='outline-secondary' onClick={props.handleClearFormButton}>
        <Backspace size={20} />
      </Button>
      <Button variant='outline-secondary' onClick={props.handleClearResultButton}>
        <Trash size={20} />
      </Button>
    </>
  );
}

export default SearchLibraryFormButtons;
