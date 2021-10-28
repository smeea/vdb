import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Folder2Open from '../../assets/images/icons/folder2-open.svg';

function DeckCopyUrl(props) {
  const history = useHistory();
  return (
    <>
      <Button
        variant="secondary"
        onClick={() =>
          history.push(props.deckid ? `/decks?id=${props.deckid}` : '/decks')
        }
      >
        <Folder2Open /> Back to Deck
      </Button>
    </>
  );
}

export default DeckCopyUrl;
