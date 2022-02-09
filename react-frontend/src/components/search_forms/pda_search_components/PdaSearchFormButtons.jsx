import React from 'react';
import { Button } from 'react-bootstrap';
import LightningFill from 'assets/images/icons/lightning-fill.svg';
import HouseDoorFill from 'assets/images/icons/house-door-fill.svg';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import X from 'assets/images/icons/x.svg';
import { useApp } from 'context';

function PdaSearchFormButtons(props) {
  const { username, isMobile } = useApp();

  return (
    <div className="d-flex pb-2 justify-content-between">
      <div className="d-flex">
        <Button variant="primary" onClick={() => props.getRandom(10)}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="pe-2">
              <Dice3 />
            </div>
            Random
          </div>
        </Button>
        <div className="ps-1">
          <Button variant="primary" onClick={() => props.getNew(50)}>
            <div className="d-flex justify-content-center align-items-center">
              <div className="pe-2">
                <LightningFill />
              </div>
              New
            </div>
          </Button>
        </div>
        {username && (
          <div className="ps-1">
            <Button variant="primary" onClick={() => props.getMy()}>
              <div className="d-flex justify-content-center align-items-center">
                <div className="pe-2">
                  <HouseDoorFill />
                </div>
                My
              </div>
            </Button>
          </div>
        )}
      </div>
      {!isMobile && (
        <div className="d-flex">
          <Button
            title="Clear Forms & Results"
            variant="primary"
            onClick={props.handleClearButton}
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  );
}

export default PdaSearchFormButtons;
