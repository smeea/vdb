import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const TwdSearchFormLibraryTotal = ({ value, onChange }) => {
  const totalBrackets = ['60-67', '68-75', '76-83', '84-90'];
  const name = 'libraryTotal';
  const LibraryTotalButtons = totalBrackets.map((i, index) => {
    return (
      <Button
        className="group-form nowrap"
        key={index}
        value={i}
        name={name}
        variant={value[i] ? 'third' : 'outline-primary'}
        onClick={onChange}
      >
        {i}
      </Button>
    );
  });

  return <ButtonGroup>{LibraryTotalButtons}</ButtonGroup>;
};

export default TwdSearchFormLibraryTotal;
