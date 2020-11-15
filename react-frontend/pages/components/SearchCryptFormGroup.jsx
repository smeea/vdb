import React from 'react';
import { Row, Col, ButtonGroup, ToggleButton } from 'react-bootstrap';

function SearchCryptFormGroup(props) {
  const groups = [1, 2, 3, 4, 5, 6];

  const GroupButtons = groups.map((i, index) => {
    return (
      <ToggleButton
        className="group-form px-3"
        key={index}
        value={i}
        name="group"
        variant="outline-secondary"
        type="checkbox"
        checked={props.value[i]}
        onChange={(e) => props.onChange(e)}
      >
        {i}
      </ToggleButton>
    );
  });

  return (
    <Row className="pt-2 pl-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <label className="h6 mb-0">Group:</label>
      </Col>
      <Col xs={9} className="d-flex justify-content-end">
        <ButtonGroup toggle>{GroupButtons}</ButtonGroup>
      </Col>
    </Row>
  );
}

export default SearchCryptFormGroup;
