import React from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { useApp } from 'context';

const CryptSearchFormGroup = ({ value, onChange }) => {
  const { isWide } = useApp();

  const groups = [1, 2, 3, 4, 5, 6, 7];

  const GroupButtons = groups.map((i, index) => {
    return (
      <Button
        className={isWide ? 'group-form px-3' : 'group-form px-3 px-sm-2'}
        key={index}
        value={i}
        name="group"
        variant={value[i] ? 'third' : 'outline-primary'}
        onClick={(e) => onChange(e)}
      >
        <div className={isWide ? '' : 'px-1'}>{i}</div>
      </Button>
    );
  });

  return (
    <Row className="pt-2 ps-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <div className="bold blue">Group:</div>
      </Col>
      <Col xs={9} className="d-flex justify-content-end px-0">
        <ButtonGroup>{GroupButtons}</ButtonGroup>
      </Col>
    </Row>
  );
};

export default CryptSearchFormGroup;
