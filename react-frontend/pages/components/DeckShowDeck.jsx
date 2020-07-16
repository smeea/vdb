import React, { useEffect, useState } from 'react';
import DeckCryptResults from './DeckCryptResults.jsx';
import DeckLibraryResults from './DeckLibraryResults.jsx';

function DeckNewCard(props) {
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

function DeckShowDeck(props) {

  if (props.deck) {
    const deck = props.deck;
    const crypt = [];
    const library = {};

    let crypt_total = 0;
    for (const card in deck.crypt) {
      crypt_total += deck.crypt[card].q;
      crypt.push([deck.crypt[card].c, deck.crypt[card].q]);
    }

    let library_total = 0;
    for (const card in deck.library) {
      library_total += deck.library[card].q;
      const ctype = deck.library[card].c['Type'];
      library[ctype] = [];
      library[ctype].push([deck.library[card].c, deck.library[card].q]);
    }

    const LibraryDeck = Object.keys(library).map((cardtype, index) => {
      if (library[cardtype].length > 0) {
        let total = 0;
        for (const card of library[cardtype]) {
          total += card[1];
        }

        return (
          <DeckLibraryResults key={index} deckCardChange={props.deckCardChange} deckid={deck.deckid} cards={library[cardtype]} cardtype={cardtype} total={total} />
        );
      }
    });

    return (
      <div>
        Deck Name: {deck.name}
        <DeckNewCard deckCardAdd={props.deckCardAdd} deckid={deck.deckid} />
        <DeckCryptResults total={crypt_total} deckCardChange={props.deckCardChange} deckid={deck.deckid} cards={crypt} />
        <br />
        {LibraryDeck}
      </div>
    );
  } else {
    return (
      <div></div>
    );
  };
}

export default DeckShowDeck;
