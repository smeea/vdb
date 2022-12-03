import React from 'react';
import { Col, ButtonGroup, Button } from 'react-bootstrap';
import { useApp } from 'context';

const CryptSearchFormGroup = ({ value, onChange }) => {
  const { isMobile, isNarrow } = useApp();
  const groups = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex flex-row pt-2 ps-1 mx-0 items-center">
      <Col xs={3} className="flex px-0">
        <div className="font-bold text-blue">Group:</div>
      </Col>
      <Col xs={9} className="flex justify-end px-0">
        <ButtonGroup>
          {groups.map((i, index) => {
            return (
              <Button
                className={`group-form ${
                  !isMobile && isNarrow ? 'px-2' : 'px-14px'
                }`}
                key={index}
                value={i}
                name="group"
                variant={value[i] ? 'third' : 'outline-primary'}
                onClick={onChange}
              >
                <div className="px-1 px-md-0">{i}</div>
              </Button>
            );
          })}
        </ButtonGroup>
      </Col>
    </div>
  );
};

export default CryptSearchFormGroup;
