import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

function TwdSearchFormCapacity(props) {
  const capacityBrackets = ['1-4', '4-6', '6-8', '8-11'];

  const CryptCapacityButtons = capacityBrackets.map((i, index) => {
    return (
      <Button
        className="group-form px-3"
        key={index}
        value={i}
        name="capacity"
        variant={props.value[i] ? 'third' : 'outline-primary'}
        onClick={(e) => props.onChange(e)}
      >
        {i}
      </Button>
    );
  });

  return <ButtonGroup>{CryptCapacityButtons}</ButtonGroup>;
}

export default TwdSearchFormCapacity;
