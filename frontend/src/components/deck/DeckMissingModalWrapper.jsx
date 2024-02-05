import React from 'react';
import { DeckMissingModal } from '@/components';
import { useDeckMissing } from '@/hooks';

const DeckMissingModalWrapper = ({ deck, handleClose }) => {
  const { missingCrypt, missingLibrary } = useDeckMissing(deck);

  return (
    <DeckMissingModal
      deck={{
        ...deck,
        name: `Missing card for ${deck.name}`,
        crypt: missingCrypt,
        library: missingLibrary,
        isAuthor: false,
      }}
      handleClose={handleClose}
    />
  );
};

export default DeckMissingModalWrapper;
