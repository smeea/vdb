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
        <div className="bp-125">
          <DeckImport
            setActiveDeck={props.setActiveDeck}
            getDecks={props.getDecks}
            setShowInfo={props.setShowInfo}
            setShowButtons={props.setShowButtons}
            isMobile={props.isMobile}
          />
        </div>
      )}
      {props.activeDeck && (
        <div className="bp-125">
          <DeckExport
            activeDeck={props.activeDeck}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.isAuthor && props.deck && (
        <div className="bp-125">
          <DeckDelete
            deck={props.deck}
            getDecks={props.getDecks}
            setActiveDeck={props.setActiveDeck}
            setShowButtons={props.setShowButtons}
            isMobile={props.isMobile}
          />
        </div>
      )}
      {props.username && props.deck && (
        <div className="bp-125">
          <DeckClone
            author={props.deck.author}
            name={props.deck.name}
            deck={props.deck}
            deckid={props.deck.deckid}
            getDecks={props.getDecks}
            setActiveDeck={props.setActiveDeck}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.deck && (
        <div className="bp-125">
          <DeckCopyUrlButton
            value={props.deck.deckid}
            setShowButtons={props.setShowButtons}
          />
        </div>
      )}
      {props.activeDeck && (
        <div className="bp-125">
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
        <div className="bp-125">
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
