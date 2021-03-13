import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';

function ButtonCardCopyUrl(props) {
  const [state, setState] = useState(false);

  const deckUrl = `${process.env.ROOT_URL}cards/${props.id}`;

  const handleButton = () => {
    navigator.clipboard.writeText(deckUrl);
    setState(true);
    setTimeout(() => {
      setState(false);
      props.isMobile && props.setShowButtons(false);
    }, 1000);
  };

  return (
    <>
      {!state ? (
        <Button variant="outline-secondary" onClick={handleButton}>
          <ShareFill />
        </Button>
      ) : (
        <Button variant="success" onClick={handleButton}>
          Copied
        </Button>
      )}
    </>
  );
}

export default ButtonCardCopyUrl;
