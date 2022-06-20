import React, { useState } from 'react';
import Files from 'assets/images/icons/files.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckCloneButton = ({ deck, src, noText, inPda, inTwd }) => {
  const {
    setDecks,
    setActiveDeck,
    setShowFloatingButtons,
    setShowMenuButtons,
  } = useApp();

  const [state, setState] = useState(false);

  const cloneDeck = () => {
    const url = `${process.env.API_URL}decks/clone`;
    const body = {
      deckname: deck.name + ' [by ' + deck.author + ']',
      author: deck.author,
      src: src,
    };

    switch (deck.deckid) {
      case 'deckInUrl':
        body['deck'] = deck;
        break;
      default:
        body['target'] = deck.deckid;
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
          let name = deck.name;
          if (src !== 'precons') {
            name += ` [by ${deck.author}]`;
          } else {
            name += ' [PRECON]';
          }

          setDecks((prevState) => ({
            ...prevState,
            [data.deckid]: {
              ...deck,
              name: name,
              deckid: data.deckid,
              crypt: { ...deck.crypt },
              library: { ...deck.library },
              timestamp: now.toUTCString(),
              branchName: null,
              branches: [],
              master: null,
              is_yours: true,
            },
          }));
          setActiveDeck({ src: 'my', deckid: data.deckid });
          setState(true);
          setTimeout(() => {
            setState(false);
          }, 1000);
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
        }
      });
  };

  return (
    <ButtonIconed
      variant={state ? 'success' : noText ? 'primary' : 'secondary'}
      onClick={cloneDeck}
      title="Clone Deck to your account for editing"
      icon={<Files />}
      text={
        !noText &&
        (state ? 'Cloned' : `Clone${!(inPda || inTwd) ? ' Deck' : ''}`)
      }
    />
  );
};

export default DeckCloneButton;
