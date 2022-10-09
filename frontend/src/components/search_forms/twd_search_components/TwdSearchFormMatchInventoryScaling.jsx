import React from 'react';
import { Form } from 'react-bootstrap';

const TwdSearchFormMatchInventoryScaling = ({ value, target, onChange }) => {
  return (
    <Form.Check
      type="checkbox"
      id={target}
      htmlFor={target}
      name={target}
      label={`Scale to ${target} cards`}
      checked={value === target}
      onChange={onChange}
    />
  );
};

export default TwdSearchFormMatchInventoryScaling;
