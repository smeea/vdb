import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';
import AppContext from '../../context/AppContext.js';

function DeckCopyUrlMutableButton(props) {
  const { isMobile } = useContext(AppContext);
  const deckUrl = `${process.env.ROOT_URL}decks?id=${props.value}`;

  const handleButton = () => {
    navigator.clipboard.writeText(deckUrl);
    setState(true);
    setTimeout(() => {
      setState(false);
      isMobile && props.setShowButtons(false);
    }, 1000);
  };

  const [state, setState] = useState(false);

  return (
    <Button
      variant={state ? 'success' : 'outline-secondary'}
      onClick={handleButton}
      block={!props.noText}
    >
      <ShareFill /> {!props.noText && (state ? 'Copied' : 'Copy URL')}
    </Button>
  );
}

export default DeckCopyUrlMutableButton;
