import React from 'react';
import { DeckMissingModal } from '@/components';
import { useDeckMissing } from '@/hooks';
import { NAME } from '@/constants';

const DeckMissingModalWrapper = ({ deck, handleClose }) => {
  const { missingCrypt, missingLibrary } = useDeckMissing(deck);

  return (
    <DeckMissingModal
      deck={{
        name: `Missing card for ${deck[NAME]}`,
        crypt: missingCrypt,
        library: missingLibrary,
      }}
      handleClose={handleClose}
    />
  );
};

export default DeckMissingModalWrapper;
