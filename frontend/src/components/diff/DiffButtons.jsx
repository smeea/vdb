import React from 'react';
import { Stack } from 'react-bootstrap';
import {
  DiffCopyUrlButton,
  DiffBackButton,
  DeckProxyButton,
  DeckMissingButton,
} from 'components';

const DiffButtons = ({ deck, deckTo, missingCrypt, missingLibrary }) => {
  return (
    <Stack gap={1}>
      {deck && (
        <>
          <DiffBackButton deckid={deck.deckid} />
          {deckTo && (
            <DiffCopyUrlButton
              deckFromId={deck.deckid}
              deckToId={deckTo.deckid}
            />
          )}
          <DeckProxyButton
            deck={deck}
            missingCrypt={missingCrypt}
            missingLibrary={missingLibrary}
            inDiff={true}
          />
          <DeckMissingButton
            deck={deck}
            missingCrypt={missingCrypt}
            missingLibrary={missingLibrary}
            inDiff={true}
          />
        </>
      )}
    </Stack>
  );
};

export default DiffButtons;
