import React from 'react';
import { Button } from 'react-bootstrap';
import { ShareFill } from 'react-bootstrap-icons';

function DeckCopyUrlButton(props) {
  const deckUrl = '/deck?id='+ props.value;
  const handleButton = () => navigator.clipboard.writeText(deckUrl);

  return (
    <>
      <Button variant='outline-secondary' onClick={handleButton}>
        <ShareFill />{' '}Copy URL
      </Button>
    </>
  );
}

export default DeckCopyUrlButton;
