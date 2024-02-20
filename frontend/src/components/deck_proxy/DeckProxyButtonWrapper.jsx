import React from 'react';
import { DeckProxyButton } from '@/components';
import { useDeckMissing } from '@/hooks';
import { useApp } from '@/context';

const DeckProxyButtonWrapper = ({ deck }) => {
  const { inventoryMode } = useApp();
  const { missingCrypt, missingLibrary } = useDeckMissing(deck, !inventoryMode);

  return (
    <DeckProxyButton
      missingCrypt={missingCrypt}
      missingLibrary={missingLibrary}
      deck={deck}
    />
  );
};

export default DeckProxyButtonWrapper;
