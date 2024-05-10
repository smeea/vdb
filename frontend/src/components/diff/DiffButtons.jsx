import React from 'react';
import {
  DiffCopyUrlButton,
  DiffBackButton,
  DiffProxyButtonWrapper,
  DeckMissingButton,
} from '@/components';

const DiffButtons = ({ deckFrom, deckTo }) => {
  return (
    <div className="flex flex-col space-y-1">
      <DiffBackButton deckid={deckFrom?.deckid} />
      <DiffCopyUrlButton deckFromId={deckFrom?.deckid} deckToId={deckTo?.deckid} />
      {deckFrom && deckTo && (
        <>
          <DiffProxyButtonWrapper deckFrom={deckFrom} deckTo={deckTo} />
          <DeckMissingButton deck={deckFrom} deckTo={deckTo} />
        </>
      )}
    </div>
  );
};

export default DiffButtons;
