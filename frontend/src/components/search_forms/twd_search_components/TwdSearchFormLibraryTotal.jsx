import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

function TwdSearchFormLibraryTotal(props) {
  const totalBrackets = ['60-67', '68-75', '76-83', '84-90'];

  const LibraryTotalButtons = totalBrackets.map((i, index) => {
    return (
      <Button
        className="group-form nowrap"
        key={index}
        value={i}
        name="libraryTotal"
        variant={props.value[i] ? 'third' : 'outline-primary'}
        onClick={(e) => props.onChange(e)}
      >
        {i}
      </Button>
    );
  });

  return <ButtonGroup>{LibraryTotalButtons}</ButtonGroup>;
}

export default TwdSearchFormLibraryTotal;
