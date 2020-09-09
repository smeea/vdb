import React from 'react';
import { Form } from 'react-bootstrap';

function AddModeSwitch(props) {
  return(
    <Form.Check
      onChange={props.handleAddModeSwitch}
      checked={props.addMode}
      type="switch"
      id="addmode-switch"
      label="Deck Mode"
    />
  );
};

export default AddModeSwitch;
