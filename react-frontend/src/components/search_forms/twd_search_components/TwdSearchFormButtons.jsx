import React from 'react';
import { Button } from 'react-bootstrap';
import LightningFill from 'assets/images/icons/lightning-fill.svg';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import X from 'assets/images/icons/x.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

function TwdSearchFormButtons(props) {
  const { isMobile } = useApp();

  return (
    <div
      className={`d-flex pb-2 justify-content-${isMobile ? 'end' : 'between'}`}
    >
      <div className="d-flex">
        <ButtonIconed
          variant="primary"
          onClick={() => props.getRandom(20)}
          title="Get 20 random TWD"
          icon={<Dice3 />}
          text="Random"
        />

        <div className="ps-1">
          <ButtonIconed
            variant="primary"
            onClick={() => props.getNew(50)}
            title="Get 50 newest TWD"
            icon={<LightningFill />}
            text="New"
          />
        </div>
      </div>
      {!isMobile && (
        <div className="d-flex">
          <Button
            title="Clear Forms & Results"
            variant="primary"
            onClick={props.handleClearButton}
          >
            <div className="d-flex align-items-center">
              <X />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}

export default TwdSearchFormButtons;
