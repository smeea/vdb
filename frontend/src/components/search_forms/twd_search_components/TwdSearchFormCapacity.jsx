import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const TwdSearchFormCapacity = ({ value, onChange }) => {
  const capacityBrackets = ['1-4', '4-6', '6-8', '8-11'];

  const CryptCapacityButtons = capacityBrackets.map((i, index) => {
    return (
      <Button
        className="group-form nowrap px-3"
        key={index}
        value={i}
        name="capacity"
        variant={value[i] ? 'third' : 'outline-primary'}
        onClick={(e) => onChange(e)}
      >
        {i}
      </Button>
    );
  });

  return <ButtonGroup>{CryptCapacityButtons}</ButtonGroup>;
};

export default TwdSearchFormCapacity;
