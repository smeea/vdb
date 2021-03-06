import React from 'react';
import DeckBranchCreate from './DeckBranchCreate.jsx';
import DeckBranchDelete from './DeckBranchDelete.jsx';

function DeckBranchButtons(props) {
  return (
    <>
      {props.username && props.deck && (
        <DeckBranchCreate
          deck={props.deck}
          getDecks={props.getDecks}
          activeDeck={props.activeDeck}
          setActiveDeck={props.setActiveDeck}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.isAuthor && props.deck && (
        <DeckBranchDelete
          deck={props.deck}
          getDecks={props.getDecks}
          setActiveDeck={props.setActiveDeck}
          setShowButtons={props.setShowButtons}
          isMobile={props.isMobile}
        />
      )}
    </>
  );
}

export default DeckBranchButtons;
