import React from 'react';
import { Form } from 'react-bootstrap';

function TwdSearchFormMatchInventoryScaling(props) {
  return (
    <Form.Check
      type="checkbox"
      id={props.target}
      htmlFor={props.target}
      name={props.target}
      label={`Scale to ${props.target} cards`}
      checked={props.value === props.target}
      onChange={props.onChange}
    />
  );
}

export default TwdSearchFormMatchInventoryScaling;
