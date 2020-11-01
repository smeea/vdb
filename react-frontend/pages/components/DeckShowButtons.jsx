import React from 'react';
import DeckDraw from './DeckDraw.jsx';
import DeckClone from './DeckClone.jsx';
import DeckDelete from './DeckDelete.jsx';
import DeckCopyUrlButton from './DeckCopyUrlButton.jsx';
import DeckImport from './DeckImport.jsx';
import DeckExport from './DeckExport.jsx';

function DeckShowButtons(props) {
  return (
    <>
      <div>
        {props.username && (
          <DeckImport
            setActiveDeck={props.setActiveDeck}
            getDecks={props.getDecks}
          />
        )}
      </div>
      <div>
        <DeckExport activeDeck={props.activeDeck} />
      </div>
      {props.isAuthor && props.deck && (
        <div>
          <DeckDelete deck={props.deck} setActiveDeck={props.setActiveDeck} />
        </div>
      )}
      {props.username && (
        <div>
          <DeckClone
            author={props.deck.author}
            name={props.deck.name}
            deckid={props.deck.deckid}
            getDecks={props.getDecks}
            setActiveDeck={props.setActiveDeck}
          />
        </div>
      )}
      <div>
        <DeckCopyUrlButton value={props.deck.deckid} />
      </div>
      <div>
        <DeckDraw crypt={props.deck.crypt} library={props.deck.library} />
      </div>
    </>
  );
}

export default DeckShowButtons;
