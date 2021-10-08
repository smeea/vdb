import React from 'react';
import { Form } from 'react-bootstrap';

function TwdSearchFormMatchInventoryScaling(props) {
  return (
    <Form.Check
      type="checkbox"
      id="scaling"
      label="Scale to 60 cards"
      checked={props.value}
      onChange={(e) => props.onChange(e)}
    />
  );
}

export default TwdSearchFormMatchInventoryScaling;
