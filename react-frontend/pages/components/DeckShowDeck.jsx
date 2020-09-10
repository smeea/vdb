import React from 'react';

import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckDraw from './DeckDraw.jsx';
import DeckNewCryptName from './DeckNewCryptName.jsx';
import DeckNewLibraryName from './DeckNewLibraryName.jsx';
import DeckNameDeck from './DeckNameDeck.jsx';
import DeckDescriptionDeck from './DeckDescriptionDeck.jsx';
import DeckCloneDeck from './DeckCloneDeck.jsx';

function DeckShowDeck(props) {
  if (props.deck !== undefined) {
    const DECK_URL = process.env.ROOT_URL + 'deck/'+ props.deck.deckid;
    return (
      <>
        <b>URL: </b>
        <a href={DECK_URL}>{DECK_URL}</a>
        <DeckCloneDeck
          author={props.deck.author}
          name={props.deck.name}
          deckid={props.deck.deckid}
          getDecks={props.getDecks}
          setActiveDeck={props.setActiveDeck}
        />
        <br />
        <DeckNameDeck
          name={props.deck.name}
          deckUpdate={props.deckUpdate}
          deckid={props.deck.deckid}
          activeDeck={props.activeDeck}
        />
        <DeckDescriptionDeck
          description={props.deck.description}
          deckUpdate={props.deckUpdate}
          deckid={props.deck.deckid}
        />
        <br />
        <DeckNewCryptName deckCardAdd={props.deckCardAdd} />
        <DeckNewLibraryName deckCardAdd={props.deckCardAdd} />
        <DeckDraw crypt={props.deck.crypt} library={props.deck.library} />
        <DeckCrypt
          deckCardChange={props.deckCardChange}
          deckid={props.deck.deckid}
          cards={props.deck.crypt}
        />
        <br />
        <DeckLibrary
          deckCardChange={props.deckCardChange}
          deckid={props.deck.deckid}
          cards={props.deck.library}
        />
      </>
    );
  } else {
    return (
      <></>
    );
  };
}

export default DeckShowDeck;
