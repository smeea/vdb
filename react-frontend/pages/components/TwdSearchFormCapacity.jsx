import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

function TwdSearchFormCapacity(props) {
  const capacityBrackets = ['1-4', '4-6', '6-8', '8-11'];

  const CryptCapacityButtons = capacityBrackets.map((i, index) => {
    return (
      <ToggleButton
        className="group-form"
        key={index}
        value={i}
        name="capacity"
        variant="outline-secondary"
        type="checkbox"
        checked={props.value[i]}
        onChange={(e) => props.onChange(e)}
      >
        {i}
      </ToggleButton>
    );
  });

  return <ButtonGroup toggle>{CryptCapacityButtons}</ButtonGroup>;
}

export default TwdSearchFormCapacity;
