import React from 'react';
import DeckDraw from './DeckDraw.jsx';
import DeckClone from './DeckClone.jsx';
import DeckDelete from './DeckDelete.jsx';
import DeckCopyUrlButton from './DeckCopyUrlButton.jsx';
import DeckImport from './DeckImport.jsx';
import DeckExport from './DeckExport.jsx';
import DeckProxy from './DeckProxy.jsx';

function DeckButtons(props) {
  return (
    <>
      {props.username && (
        <div>
          <DeckImport
            setActiveDeck={props.setActiveDeck}
            getDecks={props.getDecks}
            setShowInfo={props.setShowInfo}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.activeDeck && (
        <div>
          <DeckExport
            activeDeck={props.activeDeck}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.isAuthor && props.deck && (
        <div>
          <DeckDelete
            deck={props.deck}
            getDecks={props.getDecks}
            setActiveDeck={props.setActiveDeck}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.username && props.deck && (
        <div>
          <DeckClone
            author={props.deck.author}
            name={props.deck.name}
            deckid={props.deck.deckid}
            getDecks={props.getDecks}
            setActiveDeck={props.setActiveDeck}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.deck && (
        <div>
          <DeckCopyUrlButton
            value={props.deck.deckid}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.activeDeck && (
        <div>
          <DeckProxy
            deck={props.deck}
            isMobile={props.isMobile}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            setShowInfo={props.setShowInfo}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.deck && (
        <div>
          <DeckDraw
            crypt={props.deck.crypt}
            library={props.deck.library}
            isMobile={props.isMobile}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
    </>
  );
}

export default DeckButtons;
