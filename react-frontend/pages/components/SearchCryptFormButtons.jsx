import React from 'react';
import { Spinner, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import Check2 from '../../assets/images/icons/check2.svg';

function SearchCryptFormButtons(props) {
  return (
    <>
      {!props.spinner ? (
        <Button variant="outline-secondary" type="submit">
          <Check2 size={20} />
        </Button>
      ) : (
        <Button variant="outline-secondary">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <Spinner />
        </Button>
      )}
      <Button variant="outline-secondary" onClick={props.handleClearButton}>
        <X size={20} />
      </Button>
    </>
  );
}

export default SearchCryptFormButtons;
