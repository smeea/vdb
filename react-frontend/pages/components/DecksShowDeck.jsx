import React, { useEffect, useState } from 'react';
import { CryptDeckResults } from './CryptResults.jsx';
import { LibraryDeckResults } from './LibraryResults.jsx';

function DecksNewCard(props) {
  const deckid = props.deckid;
  const deckCardAdd=props.deckCardAdd;

  const [state, setState] = useState({
    cardid: '',
  });

  const handleChange = event => {
    const { cardid, value } = event.target;
    setState({cardid: value});
  };

  const clearFormButton = event => {
    setState({cardid: ''});
  };

  const createNewCard = event => {
    if (state.cardid) {
      deckCardAdd(deckid, state.cardid);

    } else {
      console.log('Error: submit with empty forms');
    };
  };

  return (
    <div>
      <input
        placeholder="New Card Id"
        type="text"
        id="cardid"
        value={state.cardid}
        onChange={handleChange}/>
      <button className="btn btn-outline-secondary" type="button" onClick={createNewCard}>
        ADD
      </button>
      <button className="btn btn-outline-secondary" type="button" onClick={clearFormButton}>
        CLEAR
      </button>
    </div>
  );
}

function DecksShowDeck(props) {

  if (props.deck) {
    const deck = props.deck;
    const crypt = [];
    const library = [];

    for (const card in deck.crypt) {
      crypt.push([deck.crypt[card].c, deck.crypt[card].q]);
    }

    for (const card in deck.library) {
      library.push([deck.library[card].c, deck.library[card].q]);
    }

    return (
      <div>
        DECK NAME: {deck.name}
        <DecksNewCard deckCardAdd={props.deckCardAdd} deckid={deck.deckid} />
        <CryptDeckResults deckCardChange={props.deckCardChange} deckid={deck.deckid} cards={crypt} />
        <br />
        <LibraryDeckResults deckCardChange={props.deckCardChange} deckid={deck.deckid} cards={library} />
      </div>
    );
  } else {
    return (
      <div></div>
    );
  };
}

export default DecksShowDeck;
