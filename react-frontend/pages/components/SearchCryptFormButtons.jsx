import React from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { Check2, Backspace, Trash } from 'react-bootstrap-icons';

function SearchCryptFormButtons(props) {
  return (
    <>
      { props.spinner
        ? <Button variant="outline-secondary">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </Button>
        : <Button variant='outline-secondary' type='submit'>
          <Spinner />
          <Check2 size={20} />
        </Button>
      }
      <Button variant='outline-secondary' onClick={props.handleClearFormButton}>
        <Backspace size={20} />
      </Button>
      <Button variant='outline-secondary' onClick={props.handleClearResultButton}>
        <Trash size={20} />
      </Button>
    </>
  );
}

export default SearchCryptFormButtons;
