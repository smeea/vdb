import React from 'react';
import X from 'assets/images/icons/x.svg';
import {
  DiffCopyUrlButton,
  DiffBackButton,
  DeckProxyButton,
  DeckMissingButton,
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
        <div
          onClick={handleClose}
          className="float-right-bottom float-clear flex items-center justify-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default DiffButtons;
