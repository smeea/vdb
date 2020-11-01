import React from 'react';
import DeckPreviewCrypt from './DeckPreviewCrypt.jsx';
import DeckPreviewLibrary from './DeckPreviewLibrary.jsx';

function DeckPreview(props) {
  if (props.deck !== undefined) {
    return (
      <>
        <DeckPreviewCrypt
          deckCardChange={props.deckCardChange}
          deckid={props.deck.deckid}
          cards={props.deck.crypt}
          showImage={props.showImage}
          toggleImage={props.toggleImage}
        />
        <DeckPreviewLibrary
          deckCardChange={props.deckCardChange}
          deckid={props.deck.deckid}
          cards={props.deck.library}
          showImage={props.showImage}
          toggleImage={props.toggleImage}
        />
      </>
    );
  } else return <></>;
}

export default DeckPreview;
