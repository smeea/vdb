import React from 'react';
import { Button } from 'react-bootstrap';

function DeckCopyUrlButton(props) {
  const deckUrl= process.env.ROOT_URL + 'deck?id='+ props.value;
  const handleButton = () => navigator.clipboard.writeText(deckUrl)

  return (
    <>
      <Button variant='outline-secondary' onClick={handleButton}>
        Copy Link
      </Button>
    </>
  );
}

export default DeckCopyUrlButton;
