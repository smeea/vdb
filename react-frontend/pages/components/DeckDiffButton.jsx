import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import FileDiffFill from '../../assets/images/icons/file-diff-fill.svg';
import AppContext from '../../context/AppContext';

const DeckDiffButton = (props) => {
  const { inventoryMode, username, isMobile } = useContext(AppContext);

  const history = useHistory();

  return (
    <Button
      onClick={() => {
        isMobile && props.setShowButtons(false);
        history.push(`/diff?from=${props.deckid}&to=${props.deckid}`);
      }}
      variant="secondary"
    >
      <div className="d-flex justify-content-center align-items-center">
        <div className="pe-2">
          <FileDiffFill />
        </div>
        Compare Deck
      </div>
    </Button>
  );
};

export default DeckDiffButton;
