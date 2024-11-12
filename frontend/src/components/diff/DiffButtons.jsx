import React from 'react';
import {
  DiffCopyUrlButton,
  DiffBackButton,
  DiffProxyButtonWrapper,
  DeckMissingButton,
} from '@/components';
import { DECKID } from '@/constants';

const DiffButtons = ({ setShowMissing, deckFrom, deckTo }) => {
  return (
    <div className="flex flex-col gap-1">
      <DiffBackButton deckid={deckFrom?.[DECKID]} />
      <DiffCopyUrlButton deckFromId={deckFrom?.[DECKID]} deckToId={deckTo?.[DECKID]} />
      {deckFrom && deckTo && (
        <>
          <DiffProxyButtonWrapper deckFrom={deckFrom} deckTo={deckTo} />
          <DeckMissingButton setShow={setShowMissing} />
        </>
      )}
    </div>
  );
};

export default DiffButtons;
