import React from 'react';
import { useDiffMissing } from '@/hooks';
import { DeckMissingModal } from '@/components';
import { NAME, CRYPT, LIBRARY } from '@/constants';

const DiffMissingModalWrapper = ({ setShow, deckFrom, deckTo }) => {
  const { missingCrypt, missingLibrary } = useDiffMissing(deckFrom, deckTo);

  return (
    <DeckMissingModal
      deck={{
        [NAME]: `Missing card for ${deckFrom[NAME]}`,
        [CRYPT]: missingCrypt,
        [LIBRARY]: missingLibrary,
      }}
      setShow={setShow}
    />
  );
};

export default DiffMissingModalWrapper;
