import React from 'react';
import { useDiffMissing } from '@/hooks';
import { DeckMissingModal } from '@/components';

const DiffMissingModalWrapper = ({ deckFrom, deckTo, handleClose }) => {
  const { missingCrypt, missingLibrary } = useDiffMissing(deckFrom, deckTo);

  return (
    <DeckMissingModal
      deck={{
        name: `Missing card for ${deckFrom[NAME]}`,
        crypt: missingCrypt,
        library: missingLibrary,
      }}
      handleClose={handleClose}
    />
  );
};

export default DiffMissingModalWrapper;
