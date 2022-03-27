import React, { useState } from 'react';
import Files from 'assets/images/icons/files.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckCloneButton = (props) => {
  const { getDecks, setActiveDeck, isMobile } = useApp();

  const [state, setState] = useState(false);

  const cloneDeck = () => {
    let newdeckid;
    const url = `${process.env.API_URL}decks/clone`;
    const body = {
      deckname: props.deck.name + ' [by ' + props.deck.author + ']',
      author: props.deck.author,
      src: props.activeDeck.src,
    };

    switch (props.activeDeck['src']) {
      case 'shared':
        body['deck'] = props.deck;
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
          newdeckid = data.deckid;
        }
      })
      .then(() => getDecks())
      .then(() => setActiveDeck({ src: 'my', deckid: newdeckid }))
      .then(() => {
        setState(true);
        isMobile && props.setShowButtons(false);
        setTimeout(() => {
          setState(false);
        }, 1000);
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
