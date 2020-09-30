import React from 'react';

import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckDraw from './DeckDraw.jsx';
import DeckNewCryptName from './DeckNewCryptName.jsx';
import DeckNewLibraryName from './DeckNewLibraryName.jsx';
import DeckNameDeck from './DeckNameDeck.jsx';
import DeckAuthorDeck from './DeckAuthorDeck.jsx';
import DeckDescriptionDeck from './DeckDescriptionDeck.jsx';
import DeckCloneDeck from './DeckCloneDeck.jsx';
import DeckCopyUrlButton from './DeckCopyUrlButton.jsx';

function DeckShowDeck(props) {
  const deckUrl = 'deck?id='+ props.deck.deckid;
  const isAuthor = props.username == props.deck.owner;

  return (
    <>
      <DeckCopyUrlButton value={props.deck.deckid} />
      { props.username &&
        <DeckCloneDeck
          author={props.deck.author}
          name={props.deck.name}
          deckid={props.deck.deckid}
          getDecks={props.getDecks}
          setActiveDeck={props.setActiveDeck}
        />
      }
      <br />
      <DeckNameDeck
        name={props.deck.name}
        deckUpdate={props.deckUpdate}
        deckid={props.deck.deckid}
        isAuthor={isAuthor}
      />
      <DeckDescriptionDeck
        description={props.deck.description}
        deckUpdate={props.deckUpdate}
        deckid={props.deck.deckid}
        isAuthor={isAuthor}
      />
      <DeckAuthorDeck
        author={props.deck.author}
        deckUpdate={props.deckUpdate}
        deckid={props.deck.deckid}
        isAuthor={isAuthor}
      />
      <br />
      { isAuthor &&
        <DeckNewCryptName deckCardAdd={props.deckCardAdd} />
      }
      { isAuthor &&
        <DeckNewLibraryName deckCardAdd={props.deckCardAdd} />
      }
      <DeckDraw crypt={props.deck.crypt} library={props.deck.library} />
      <DeckCrypt
        deckCardChange={props.deckCardChange}
        deckid={props.deck.deckid}
        cards={props.deck.crypt}
        showImage={props.showImage}
        toggleImage={props.toggleImage}
        isAuthor={isAuthor}
      />
      <br />
      <DeckLibrary
        deckCardChange={props.deckCardChange}
        deckid={props.deck.deckid}
        cards={props.deck.library}
        showImage={props.showImage}
        toggleImage={props.toggleImage}
        isAuthor={isAuthor}
      />
    </>
  )
}

export default DeckShowDeck;
