import React, { useEffect, useState } from 'react';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckDraw from './DeckDraw.jsx';

function DeckNewCard(props) {
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
      props.deckCardAdd(props.deckid, state.cardid);

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
    return (
      <div>
        <b>Deck Name: {props.deck.name}</b>
        <DeckNewCard deckCardAdd={props.deckCardAdd} deckid={props.deck.deckid} />
        <br />
        <DeckDraw crypt={props.deck.crypt} library={props.deck.library} />
        <DeckCrypt deckCardChange={props.deckCardChange} deckid={props.deck.deckid} cards={props.deck.crypt} />
        <br />
        <DeckLibrary deckCardChange={props.deckCardChange} deckid={props.deck.deckid} cards={props.deck.library} />
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
