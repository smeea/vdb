import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import LightningFill from '../../assets/images/icons/lightning-fill.svg';
import Dice3 from '../../assets/images/icons/dice-3-fill.svg';
import X from '../../assets/images/icons/x.svg';
import AppContext from '../../context/AppContext';

function TwdSearchFormButtons(props) {
  const { isMobile } = useContext(AppContext);

  return (
    <div className="d-flex pb-2 justify-content-between">
      <div className="d-flex">
        <Button
          variant="outline-secondary"
          onClick={() => props.getRandomTwd(10)}
        >
          <Dice3 /> 10 Random
        </Button>

        <div className="pl-1">
          <Button
            variant="outline-secondary"
            onClick={() => props.getNewTwd(50)}
          >
            <LightningFill /> 50 New
          </Button>
        </div>
      </div>
      {!isMobile && (
        <div className="d-flex">
          <Button variant="outline-secondary" onClick={props.handleClearButton}>
            <X />
          </Button>
        </div>
      )}
    </div>
  );
}

export default TwdSearchFormButtons;
