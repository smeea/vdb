import React from 'react';

import DeckPreviewCrypt from './DeckPreviewCrypt.jsx';
import DeckPreviewLibrary from './DeckPreviewLibrary.jsx';

function DeckPreview(props) {
  if (props.deck !== undefined) {
    return (
      <>
        <DeckPreviewCrypt
          showImage={props.showImage}
          toggleImage={props.toggleImage}
          deckCardChange={props.deckCardChange}
          deckid={props.deck.deckid}
          cards={props.deck.crypt}
        />
        <DeckPreviewLibrary
          showImage={props.showImage}
          toggleImage={props.toggleImage}
          deckCardChange={props.deckCardChange}
          deckid={props.deck.deckid}
          cards={props.deck.library}
        />
      </>
    );
  } else return <></>;
}

export default DeckPreview;
