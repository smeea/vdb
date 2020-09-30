import React from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { X, Check2 } from 'react-bootstrap-icons';

function SearchLibraryFormButtons(props) {
  return (
    <>
      {props.spinner ? (
        <Button variant="outline-secondary">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </Button>
      ) : (
        <Button variant="outline-secondary" type="submit">
          <Spinner />
          <Check2 size={20} />
        </Button>
      )}
      <Button variant="outline-secondary" onClick={props.handleClearButton}>
        <X size={20} />
      </Button>
    </>
  );
}

export default SearchLibraryFormButtons;
