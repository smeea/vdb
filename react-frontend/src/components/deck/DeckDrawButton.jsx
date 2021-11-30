import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import AppContext from 'context/AppContext';

const DeckDrawButton = (props) => {
  const { isMobile } = useContext(AppContext);

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
