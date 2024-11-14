import React from 'react';
import { useDiffMissing } from '@/hooks';
import { DeckProxyButton } from '@/components';

const DiffProxyButtonWrapper = ({ deckFrom, deckTo, setShowProxySelect }) => {
  const { missingCrypt, missingLibrary } = useDiffMissing(deckFrom, deckTo);

  return (
    <DeckProxyButton
      missingCrypt={missingCrypt}
      missingLibrary={missingLibrary}
      deck={deckFrom}
      setShowProxySelect={setShowProxySelect}
      inDiff
    />
  );
};

export default DiffProxyButtonWrapper;
