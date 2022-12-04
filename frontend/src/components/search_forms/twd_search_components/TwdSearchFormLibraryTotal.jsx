import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'components'

const TwdSearchFormLibraryTotal = ({ value, onChange }) => {
  const name = 'libraryTotal';

  return (
    <ButtonGroup>
      {['60-67', '68-75', '76-83', '84-90'].map((i, index) => {
        return (
          <Button
            className="group-form whitespace-nowrap"
            key={index}
            value={i}
            name={name}
            variant={value[i] ? 'third' : 'outline-primary'}
            onClick={onChange}
          >
            {i}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default TwdSearchFormLibraryTotal;
