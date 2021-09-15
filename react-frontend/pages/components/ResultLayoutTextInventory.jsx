import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import CalculatorFill from '../../assets/images/icons/calculator-fill.svg';

const ResultLayoutTextInventory = (props) => {
  return (
    <Row>
      <Col xs={6} lg={5} className="pr-2">
        <div className="d-flex align-items-center">
          <div className="opacity-035">
            <CalculatorFill width="14" height="14" viewBox="0 0 16 16" />
          </div>
          <div className="px-1">
            <b>
              {props.inventoryState.softUsedMax +
                props.inventoryState.hardUsedTotal}
            </b>
          </div>
          - Total Used
        </div>
        <div className="d-flex align-items-center">
          <div className="opacity-035">
            <ArchiveFill width="14" height="14" viewBox="0 0 16 16" />
          </div>
          <div className="px-1">
            <b>{props.inventoryState.inInventory}</b>
          </div>
          - In Inventory
        </div>
      </Col>
      <Col xs={6} lg={7} className="pl-0">
        {props.inventoryState.usedDescription.soft && (
          <>{props.inventoryState.usedDescription.soft}</>
        )}
        {props.inventoryState.usedDescription.hard && (
          <>{props.inventoryState.usedDescription.hard}</>
        )}
      </Col>
    </Row>
  );
};

export default ResultLayoutTextInventory;
