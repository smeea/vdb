import React, { useState, useContext } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';
import BlockButton from './BlockButton.jsx';
import AppContext from '../../context/AppContext.js';

function DeckCopyUrl(props) {
  const { isMobile } = useContext(AppContext);
  const [state, setState] = useState(false);

  const handleStandardButton = () => {
    const deckUrl = `${process.env.ROOT_URL}diff?from=${props.fromQuery}&to=${props.toQuery}`;

    navigator.clipboard.writeText(deckUrl);
    setState(true);
    setTimeout(() => {
      setState(false);
      isMobile && props.setShowButtons(false);
    }, 1000);
  };

  return (
    <>
      <Button
        variant={state ? 'success' : 'secondary'}
        onClick={handleStandardButton}
      >
        <ShareFill /> {state ? 'Copied' : 'Copy URL'}
      </Button>
    </>
  );
}

export default DeckCopyUrl;
