import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';
import AppContext from '../../context/AppContext.js';

function ButtonCardCopyUrl(props) {
  const { isMobile } = useContext(AppContext);

  const [state, setState] = useState(false);

  const deckUrl = `${process.env.ROOT_URL}cards/${props.id}`;

  const handleButton = () => {
    navigator.clipboard.writeText(deckUrl);
    setState(true);
    setTimeout(() => {
      setState(false);
      isMobile && props.setShowButtons(false);
    }, 1000);
  };

  return (
    <>
      {!state ? (
        <Button
          className="card-buttons"
          variant="outline-secondary"
          onClick={handleButton}
          title="Copy URL"
        >
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
