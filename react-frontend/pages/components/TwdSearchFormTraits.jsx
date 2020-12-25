import React from 'react';
import { Row, Col } from 'react-bootstrap';

function TwdSearchFormTraits(props) {
  const traitsLeft = [['star', 'Star']];

  const traitsRight = [['monoclan', 'Mono Clan']];

  const traitsLeftforms = traitsLeft.map((i, index) => {
    return (
      <div key={index} className="mr-2 custom-control custom-checkbox">
        <input
          name="traits"
          id={`traits-${i[0]}`}
          value={i[0]}
          className="mr-2 custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={`traits-${i[0]}`} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  const traitsRightforms = traitsRight.map((i, index) => {
    return (
      <div key={index} className="mr-2 custom-control custom-checkbox">
        <input
          name="traits"
          id={`traits-${i[0]}`}
          value={i[0]}
          className="mr-2 custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={`traits-${i[0]}`} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <>
      <Row className="mx-0">
        <Col xs={6} className="d-inline">
          {traitsLeftforms}
        </Col>
        <Col xs={6} className="d-inline">
          {traitsRightforms}
        </Col>
      </Row>
    </>
  );
}

export default TwdSearchFormTraits;
