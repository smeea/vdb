import React from 'react';
import { getDiffMissing } from '@/utils';
import { DeckMissingModal } from '@/components';
import { NAME, CRYPT, LIBRARY } from '@/constants';

const DiffMissingModalWrapper = ({ setShow, deckFrom, deckTo }) => {
  const { missingCrypt, missingLibrary } = getDiffMissing(deckFrom, deckTo);

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
