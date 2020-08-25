import React, { useState, useEffect } from 'react';
import DeckPreviewCrypt from './DeckPreviewCrypt.jsx';
import DeckPreviewLibrary from './DeckPreviewLibrary.jsx';

function DeckPreview(props) {
  const deckCardChange = (deckid, cardid, count) => {
    const url = 'http://127.0.0.1:5001/api/deck/' + deckid;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({update: {[cardid]: count}})
    };

    fetch(url, options)
      .then(() => props.getDecks());
  };

  if (props.deck !== undefined) {
    return (
      <div className='col-md-12 col-lg-10 col-xl-8 px-0 px-xl-2'>
        <DeckPreviewCrypt deckCardChange={deckCardChange} deckid={props.deck.deckid} cards={props.deck.crypt} />
        <DeckPreviewLibrary deckCardChange={deckCardChange} deckid={props.deck.deckid} cards={props.deck.library} />
      </div>
    );
  } else {
    return (
      <React.Fragment></React.Fragment>
    );
  };
}

export default DeckPreview;
