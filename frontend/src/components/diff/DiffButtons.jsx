import React from 'react';
import {
  DiffCopyUrlButton,
  DiffBackButton,
  DeckProxyButton,
  DeckMissingButton,
} from '@/components';

const DiffButtons = ({ deckFrom, deckTo, missingCrypt, missingLibrary }) => {
  return (
    <>
      <div className="flex flex-col space-y-1">
        <DiffBackButton deckid={deckFrom?.deckid} />
        <DiffCopyUrlButton
          deckFromId={deckFrom?.deckid}
          deckToId={deckTo?.deckid}
        />
        <DeckProxyButton
          deck={deckFrom}
          missingCrypt={missingCrypt}
          missingLibrary={missingLibrary}
          inDiff
        />
        <DeckMissingButton
          deck={deckFrom}
          missingCrypt={missingCrypt}
          missingLibrary={missingLibrary}
        />
      </div>
    </>
  );
};

export default DiffButtons;
