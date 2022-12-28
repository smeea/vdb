import React from 'react';
import X from 'assets/images/icons/x.svg';
import {
  DiffCopyUrlButton,
  DiffBackButton,
  DeckProxyButton,
  DeckMissingButton,
  ButtonFloat,
} from 'components';
import { useApp } from 'context';

const DiffButtons = ({
  deckFrom,
  deckTo,
  missingCrypt,
  missingLibrary,
  handleClose,
}) => {
  const { isNarrow } = useApp();

  return (
    <>
      {deckFrom && deckTo && (
        <div className="flex flex-col space-y-1">
          <DiffBackButton deckid={deckFrom.deckid} />
          <DiffCopyUrlButton
            deckFromId={deckFrom.deckid}
            deckToId={deckTo.deckid}
          />
          <DeckProxyButton
            deck={deckFrom}
            missingCrypt={missingCrypt}
            missingLibrary={missingLibrary}
            inDiff
          />
          <DeckMissingButton
            deck={deckFrom}
            missingCrypt={missingCrypt}
            missingLibrary={missingLibrary}
          />
        </div>
      )}
      {isNarrow && (
        <ButtonFloat onClick={handleClose} variant="bg-[#a06060] opacity-80">
          <X width="40" height="40" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default DiffButtons;
