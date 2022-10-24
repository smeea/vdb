import React from 'react';
import { Stack } from 'react-bootstrap';
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
        <Stack gap={1}>
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
        </Stack>
      )}
      {isNarrow && (
        <div
          onClick={handleClose}
          className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default DiffButtons;
