import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

function TwdSearchFormLibraryTotal(props) {
  const totalBrackets = ['60-67', '68-75', '76-83', '84-90'];

  const LibraryTotalButtons = totalBrackets.map((i, index) => {
    return (
      <ToggleButton
        className="group-form"
        key={index}
        value={i}
        name="libraryTotal"
        variant="outline-secondary"
        type="checkbox"
        checked={props.value[i]}
        onChange={(e) => props.onChange(e)}
      >
        {i}
      </ToggleButton>
    );
  });

  return <ButtonGroup toggle>{LibraryTotalButtons}</ButtonGroup>;
}

export default TwdSearchFormLibraryTotal;
