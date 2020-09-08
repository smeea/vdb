import React from 'react';

import DeckPreviewCrypt from './DeckPreviewCrypt.jsx';
import DeckPreviewLibrary from './DeckPreviewLibrary.jsx';

function DeckPreview(props) {
  const deckCardChange = (deckid, cardid, count) => {
    const url = process.env.API_URL + 'deck/' + deckid;
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
      <>
        <DeckPreviewCrypt showImage={props.showImage} toggleImage={props.toggleImage} deckCardChange={deckCardChange} deckid={props.deck.deckid} cards={props.deck.crypt} />
        <DeckPreviewLibrary showImage={props.showImage} toggleImage={props.toggleImage} deckCardChange={deckCardChange} deckid={props.deck.deckid} cards={props.deck.library} />
      </>
    );
  } else {
    return (
      <></>
    );
  };
}

export default DeckPreview;
