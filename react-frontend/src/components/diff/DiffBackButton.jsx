import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Folder2Open from 'assets/images/icons/folder2-open.svg';

function DeckCopyUrl(props) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="secondary"
        onClick={() =>
          navigate(props.deckid ? `/decks?id=${props.deckid}` : '/decks')
        }
      >
        <div className="d-flex justify-content-center align-items-center">
          <div className="pe-2">
            <Folder2Open />
          </div>
          Back to Deck
        </div>
      </Button>
    </>
  );
}

export default DeckCopyUrl;
