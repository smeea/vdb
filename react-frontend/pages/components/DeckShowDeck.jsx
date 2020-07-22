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
    const {id, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
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
  if (props.deck !== undefined) {
    const deck = props.deck;
    const crypt = props.deck.crypt;
    const library = props.deck.library;
    return (
      <div>
        <b>Deck Name: {deck.name}</b>
        <DeckNewCard deckCardAdd={props.deckCardAdd} deckid={deck.deckid} />
        <DeckCryptResults deckCardChange={props.deckCardChange} deckid={deck.deckid} cards={crypt} />
        <br />
        <DeckLibraryResults deckCardChange={props.deckCardChange} deckid={deck.deckid} cards={library} />
        <br />
      </div>
    );
  } else {
    return (
      <div></div>
    );
  };
}

export default DeckShowDeck;
