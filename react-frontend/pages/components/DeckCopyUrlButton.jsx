import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';

function DeckCopyUrlButton(props) {
  const deckUrl = `${process.env.ROOT_URL}decks?id=${props.value}`;

  const handleButton = () => {
    navigator.clipboard.writeText(deckUrl);
    setState(true);
    setTimeout(() => {
      setState(false);
      props.setShowButtons(false);
    }, 1000);
  };

  const [state, setState] = useState(false);

  return (
    <>
      {!state ? (
        <Button variant="outline-secondary" onClick={handleButton} block>
          <ShareFill /> Copy URL
        </Button>
      ) : (
        <Button variant="success" onClick={handleButton} block>
          <ShareFill /> Copied
        </Button>
      )}
    </>
  );
}

export default DeckCopyUrlButton;
