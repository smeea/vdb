import React from 'react';
import { Stack } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import {
  DeckSearchSimilarButton,
  DeckCloneButton,
  DeckDeleteButton,
  DeckCopyUrlButton,
  DeckImport,
  DeckExportButton,
  DeckProxyButton,
  DeckMissingButton,
  DeckRecommendationButton,
  DeckDrawButton,
  DeckDiffButton,
  DeckReviewButton,
  DeckBranchCreateButton,
  DeckBranchDeleteButton,
  DeckPublicButton,
  SeatingButton,
} from 'components';
import { useApp } from 'context';

const DeckButtons = ({
  deck,
  missingCrypt,
  missingLibrary,
  setShowInfo,
  setShowDraw,
  setShowSeating,
  setQrUrl,
  setShowRecommendation,
  handleClose,
}) => {
  const { playtest, inventoryMode, username, isNarrow } = useApp();
  const { isPublic, isAuthor, isBranches } = { ...deck };

  return (
    <>
      <Stack gap={1}>
        <DeckImport setShowInfo={setShowInfo} />
        {deck &&
          (playtest ||
            !(
              Object.keys(deck.crypt).some((cardid) => cardid > 210000) ||
              Object.keys(deck.library).some((cardid) => cardid > 110000)
            )) && (
            <>
              {username && <DeckCloneButton deck={deck} />}
              <DeckExportButton deck={deck} />
              {isAuthor && !isPublic && <DeckDeleteButton deck={deck} />}
              {isAuthor && !isPublic && <DeckBranchCreateButton deck={deck} />}
              {isAuthor && !isPublic && isBranches && (
                <DeckBranchDeleteButton deck={deck} />
              )}
              {isAuthor && <DeckPublicButton deck={deck} />}
              <DeckDiffButton deckid={deck.deckid} />
              <DeckReviewButton deck={deck} />
              <DeckCopyUrlButton setQrUrl={setQrUrl} deck={deck} />
              <DeckProxyButton
                deck={deck}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
              />
              <DeckRecommendationButton
                setShowRecommendation={setShowRecommendation}
              />
              <DeckSearchSimilarButton deck={deck} />
              <DeckDrawButton setShow={setShowDraw} />
              {inventoryMode && (
                <DeckMissingButton
                  deck={deck}
                  missingCrypt={missingCrypt}
                  missingLibrary={missingLibrary}
                />
              )}
            </>
          )}
        <SeatingButton setShow={setShowSeating} />
      </Stack>
      {isNarrow && (
        <div
          onClick={handleClose}
          className="flex float-right-bottom float-clear items-center justify-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default DeckButtons;
