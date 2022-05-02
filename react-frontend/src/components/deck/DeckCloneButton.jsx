import React, { useState } from 'react';
import Files from 'assets/images/icons/files.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckCloneButton = (props) => {
  const { setDecks, setActiveDeck, isMobile, username } = useApp();
  const [state, setState] = useState(false);

  const cloneDeck = () => {
    const url = `${process.env.API_URL}decks/clone`;
    const body = {
      deckname: props.deck.name + ' [by ' + props.deck.author + ']',
      author: props.deck.author,
      src: props.activeDeck.src,
    };

    switch (props.activeDeck['deckid']) {
      case 'deckInUrl':
        body['deck'] = props.deck;
        break;
      default:
        body['target'] = props.deck.deckid;
    }

    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          const now = new Date();
          let name = props.deck.name;
          if (props.activeDeck.src !== 'precons') {
            name += ` [by ${props.deck.author}]`;
          } else {
            name += ' [PRECON]';
          }

          setDecks((prevState) => ({
            ...prevState,
            [data.deckid]: {
              ...props.deck,
              name: name,
              deckid: data.deckid,
              crypt: { ...props.deck.crypt },
              library: { ...props.deck.library },
              timestamp: now.toUTCString(),
              owner: username,
            },
          }));
          setActiveDeck({ src: 'my', deckid: data.deckid });
          isMobile && props.setShowButtons(false);
          setState(true);
          setTimeout(() => {
            setState(false);
          }, 1000);
        }
      });
  };

  return (
    <ButtonIconed
      variant={state ? 'success' : props.noText ? 'primary' : 'secondary'}
      onClick={cloneDeck}
      title="Clone Deck to your account for editing"
      icon={<Files />}
      text={
        !props.noText &&
        (state
          ? 'Cloned'
          : `Clone${!(props.inPda || props.inTwd) ? ' Deck' : ''}`)
      }
    />
  );
};

export default DeckCloneButton;
