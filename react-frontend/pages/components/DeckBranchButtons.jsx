import React, { useContext } from 'react';
import DeckBranchCreate from './DeckBranchCreate.jsx';
import DeckBranchDelete from './DeckBranchDelete.jsx';
import AppContext from '../../context/AppContext.js';

function DeckBranchButtons(props) {
  const { username } = useContext(AppContext);

  return (
    <>
      {username && props.deck && (
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
        />
      )}
    </>
  );
}

export default DeckBranchButtons;
