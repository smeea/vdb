import React from 'react';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckDraw from './DeckDraw.jsx';
import DeckNewCard from './DeckNewCard.jsx';

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
