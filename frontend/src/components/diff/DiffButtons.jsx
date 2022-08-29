import React from 'react';
import { Stack } from 'react-bootstrap';
import {
  DiffCopyUrlButton,
  DiffBackButton,
  DeckProxyButton,
  DeckMissingButton,
} from 'components';

const DiffButtons = ({
  deck,
  toQuery,
  fromQuery,
  missingCrypt,
  missingLibrary,
}) => {
  return (
    <Stack gap={1}>
      {deck && (
        <>
          <DiffBackButton deckid={deck.deckid} />
          <DiffCopyUrlButton fromQuery={fromQuery} toQuery={toQuery} />
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
