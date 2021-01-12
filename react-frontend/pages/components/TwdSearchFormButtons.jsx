import React from 'react';
import { Spinner, Button } from 'react-bootstrap';
import LightningFill from '../../assets/images/icons/lightning-fill.svg';
import Check2 from '../../assets/images/icons/check2.svg';
import X from '../../assets/images/icons/x.svg';

function TwdSearchFormButtons(props) {
  return (
    <div className="d-flex pb-2 justify-content-between">
      <div className="d-flex">
        {!props.spinner ? (
          <>
            {props.isMobile &&
             <Button variant="outline-secondary" type="submit">
               <Check2 />
               <div className="d-inline pl-2 pr-2">Search</div>
             </Button>
            }
          </>
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
        <Button variant="outline-secondary" onClick={props.handleClearButton}>
          <X /> Clear
        </Button>
      </div>
      <div>
        <Button variant="outline-secondary" onClick={() => props.getNewTwd(100)}>
          <LightningFill /> 100 New
        </Button>
      </div>
    </div>
  );
}

export default TwdSearchFormButtons;
