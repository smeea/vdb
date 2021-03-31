import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';

function DeckCopyUrlMutableButton(props) {
  const deckUrl = `${process.env.ROOT_URL}decks?id=${props.value}`;

  const handleButton = () => {
    navigator.clipboard.writeText(deckUrl);
    setState(true);
    setTimeout(() => {
      setState(false);
      props.isMobile && props.setShowButtons(false);
    }, 1000);
  };

  const [state, setState] = useState(false);

  return (
    <Button
      variant={state ? 'success' : 'outline-secondary'}
      onClick={handleButton}
      block
    >
      <ShareFill /> {state ? 'Copied' : 'Copy URL'}
    </Button>
  );
}

export default DeckCopyUrlMutableButton;
