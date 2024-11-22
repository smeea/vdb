import React from 'react';
import { DeckMissingModal } from '@/components';
import { useDeckMissing } from '@/hooks';
import { NAME, CRYPT, LIBRARY } from '@/constants';

const DeckMissingModalWrapper = ({ deck, setShow = { setShow } }) => {
  const { missingCrypt, missingLibrary } = useDeckMissing(deck);

  return (
    <DeckMissingModal
      deck={{
        [NAME]: `Missing card for ${deck[NAME]}`,
        [CRYPT]: missingCrypt,
        [LIBRARY]: missingLibrary,
      }}
      setShow={setShow}
    />
  );
};

export default DeckMissingModalWrapper;
