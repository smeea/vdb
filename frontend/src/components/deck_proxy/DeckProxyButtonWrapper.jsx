import React from 'react';
import { DeckProxyButton } from '@/components';
import { useDeckMissing } from '@/hooks';
import { useApp } from '@/context';

const DeckProxyButtonWrapper = ({ deck, setShowProxySelect }) => {
  const { inventoryMode } = useApp();
  const { missingCrypt, missingLibrary } = useDeckMissing(deck, !inventoryMode);

  return (
    <DeckProxyButton
      setShowProxySelect={setShowProxySelect}
      missingCrypt={missingCrypt}
      missingLibrary={missingLibrary}
      deck={deck}
    />
  );
};

export default DeckProxyButtonWrapper;
