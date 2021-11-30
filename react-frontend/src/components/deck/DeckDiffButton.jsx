import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PlusSlashMinus from 'assets/images/icons/plus-slash-minus.svg';
import AppContext from 'context/AppContext.js';

const DeckDiffButton = (props) => {
  const { isMobile } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        isMobile && props.setShowButtons(false);
        navigate(`/diff?from=${props.deckid}&to=${props.deckid}`);
      }}
      variant="secondary"
    >
      <div className="d-flex justify-content-center align-items-center">
        <div className="pe-2">
          <PlusSlashMinus />
        </div>
        Compare Deck
      </div>
    </Button>
  );
};

export default DeckDiffButton;
