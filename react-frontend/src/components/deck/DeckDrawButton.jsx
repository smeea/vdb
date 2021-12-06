import React from 'react';
import { Button } from 'react-bootstrap';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import { useApp } from 'context';

const DeckDrawButton = (props) => {
  const { isMobile } = useApp();

  return (
    <Button
      onClick={() => {
        isMobile && props.setShowButtons(false);
        props.setShowDraw(true);
      }}
      variant="secondary"
    >
      <div className="d-flex justify-content-center align-items-center">
        <div className="pe-2">
          <Dice3 />
        </div>
        Draw Cards
      </div>
    </Button>
  );
};

export default DeckDrawButton;
