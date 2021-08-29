import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';
import AppContext from '../../context/AppContext.js';

function DeckCopyUrlImmutableButton(props) {
  const { isMobile } = useContext(AppContext);

  const handleButton = () => {
    const url = `${process.env.API_URL}decks/urlclone`;

    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: props.value,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          const deckUrl = `${process.env.ROOT_URL}decks?id=${data.deckid}`;
          navigator.clipboard.writeText(deckUrl);
        }
      })
      .then(() => {
        setState(true);
        isMobile && props.setShowButtons(false);
        setTimeout(() => {
          setState(false);
        }, 1000);
      });
  };

  const [state, setState] = useState(false);

  return (
    <Button
      variant={state ? 'success' : 'outline-secondary'}
      onClick={handleButton}
      block={!props.noText}
      title="Copy short URL, containing current deck state (not changeable even for you)"
    >
      <ShareFill /> {!props.noText && (state ? 'Copied' : 'Immutable URL')}
    </Button>
  );
}

export default DeckCopyUrlImmutableButton;
