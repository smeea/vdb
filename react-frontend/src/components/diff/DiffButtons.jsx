import React from 'react';
import { Stack } from 'react-bootstrap';
import {
  DiffCopyUrlButton,
  DiffBackButton,
  DeckProxyButton,
  DeckMissingButton,
} from 'components';

const DiffButtons = (props) => {
  return (
    <Stack gap={1}>
      {props.deck && <DiffBackButton deckid={props.deck.deckid} />}
      {props.deck && (
        <DiffCopyUrlButton
          fromQuery={props.fromQuery}
          toQuery={props.toQuery}
        />
      )}
      {props.deck && (
        <DeckProxyButton
          deck={props.deck}
          missingCrypt={props.missingCrypt}
          missingLibrary={props.missingLibrary}
          setShowProxySelect={props.setShowProxySelect}
          inDiff={true}
        />
      )}
      {props.deck && (
        <DeckMissingButton
          deck={props.deck}
          missingCrypt={props.missingCrypt}
          missingLibrary={props.missingLibrary}
          inDiff={true}
        />
      )}
    </Stack>
  );
};

export default DiffButtons;
