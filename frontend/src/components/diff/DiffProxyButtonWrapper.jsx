import React from 'react';
import { useDiffMissing } from '@/hooks';
import { DeckProxyButton } from '@/components';

const DiffProxyButtonWrapper = ({ deckFrom, deckTo }) => {
  const { missingCrypt, missingLibrary } = useDiffMissing(deckFrom, deckTo);

  return (
    <DeckProxyButton
      missingCrypt={missingCrypt}
      missingLibrary={missingLibrary}
      deck={deckFrom}
    />
  );
};

export default DiffProxyButtonWrapper;
