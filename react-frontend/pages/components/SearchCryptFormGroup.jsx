import React from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

function SearchCryptFormGroup(props) {
  const groups = [1, 2, 3, 4, 5, 6];

  const GroupButtons = groups.map((i, index) => {
    return (
      <Button
        className="group-form px-3"
        key={index}
        value={i}
        name="group"
        variant={props.value[i] ? 'third' : 'outline-primary'}
        onClick={(e) => props.onChange(e)}
      >
        {i}
      </Button>
    );
  });

  return (
    <Row className="pt-2 ps-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <div className="bold blue">Group:</div>
      </Col>
      <Col xs={9} className="d-flex justify-content-end">
        <ButtonGroup>{GroupButtons}</ButtonGroup>
      </Col>
    </Row>
  );
}

export default SearchCryptFormGroup;
