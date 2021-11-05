import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';
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
        <div className="d-flex justify-content-center align-items-center">
          <div className="pe-2">
            <ShareFill />
          </div>
          {state ? 'Copied' : 'Copy URL'}
        </div>
      </Button>
    </>
  );
}

export default DeckCopyUrl;
