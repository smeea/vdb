import React from 'react';
import { Spinner, Button } from 'react-bootstrap';
import LightningFill from '../../assets/images/icons/lightning-fill.svg';
import Check2 from '../../assets/images/icons/check2.svg';
import X from '../../assets/images/icons/x.svg';

function TwdSearchFormButtons({ handleClearButton, spinner, getNewTwd }) {
  return (
    <div className="d-flex pb-2 justify-content-between">
      <div className="d-flex">
        {!spinner ? (
          <Button variant="outline-secondary" type="submit">
            <Check2 />
            <div className="d-inline pl-2 pr-2">Search</div>
          </Button>
        ) : (
          <Button variant="outline-secondary">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <div className="d-inline pl-2 pr-1">Loading</div>
          </Button>
        )}
        <Button variant="outline-secondary" onClick={handleClearButton}>
          <X />
        </Button>
      </div>
      <div>
        <Button variant="outline-secondary" onClick={() => getNewTwd(25)}>
          <LightningFill /> 25 New
        </Button>
        <Button variant="outline-secondary" onClick={() => getNewTwd(100)}>
          <LightningFill /> 100 New
        </Button>
      </div>
    </div>
  );
}

export default TwdSearchFormButtons;
