import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Files from '../../assets/images/icons/files.svg';
import AppContext from '../../context/AppContext.js';

function DeckClone(props) {
  const { getDecks, setActiveDeck, isMobile } = useContext(AppContext);

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
    <>
      <Button
        variant={state ? 'success' : props.noText ? 'primary' : 'secondary'}
        onClick={cloneDeck}
      >
        <Files /> {!props.noText && (state ? 'Cloned' : 'Clone Deck')}
      </Button>
    </>
  );
}

export default DeckClone;
