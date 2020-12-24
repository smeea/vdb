import React from 'react';
import { FormControl, InputGroup, Spinner, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import Check2 from '../../assets/images/icons/check2.svg';

function TwdSearchFormEventAndButtons({ value, onChange, handleClearButton, spinner }) {
  return (
    <InputGroup className="mb-2">
      <FormControl
        placeholder="Event Name"
        type="text"
        name="event"
        value={value}
        onChange={onChange}
      />
      <InputGroup.Append>
        {!spinner ? (
          <Button variant="outline-secondary" type="submit">
            <Check2 />
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
        <Button variant="outline-secondary" onClick={handleClearButton}>
          <X />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default TwdSearchFormEventAndButtons;
