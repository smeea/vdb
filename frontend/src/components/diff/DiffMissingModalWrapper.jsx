import React from 'react';
import { useDiffMissing } from '@/hooks';
import { DeckMissingModal } from '@/components';
import { NAME, CRYPT, LIBRARY } from '@/constants';

const DiffMissingModalWrapper = ({ deckFrom, deckTo, handleClose }) => {
  const { missingCrypt, missingLibrary } = useDiffMissing(deckFrom, deckTo);

  return (
    <DeckMissingModal
      deck={{
        [NAME]: `Missing card for ${deckFrom[NAME]}`,
        [CRYPT]: missingCrypt,
        [LIBRARY]: missingLibrary,
      }}
      handleClose={handleClose}
    />
  );
};

export default DiffMissingModalWrapper;
