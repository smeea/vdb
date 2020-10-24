import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';

function DeckCopyUrlButton(props) {
  const deckUrl = `${process.env.ROOT_URL}deck?id=${props.value}`;
  const handleButton = () => {
    navigator.clipboard.writeText(deckUrl);
    setState(true);
    setTimeout(() => setState(false), 500);
  };

  const [state, setState] = useState(false);

  return (
    <>
      {!state ? (
        <Button
          variant="outline-secondary"
          onClick={handleButton}
          block
        >
          <ShareFill /> Copy URL
        </Button>
      ) : (
        <Button
          variant="outline-success"
          onClick={handleButton}
          block
        >
          <ShareFill /> Copied
        </Button>
      )}
    </>
  );
}

export default DeckCopyUrlButton;
