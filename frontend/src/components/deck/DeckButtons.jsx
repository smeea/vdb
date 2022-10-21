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
} from 'components';

import { useApp } from 'context';

const DeckButtons = ({
  isPublic,
  isAuthor,
  isBranches,
  missingCrypt,
  missingLibrary,
  setShowInfo,
  setShowDraw,
  setShowQr,
  setShowRecommendation,
  handleClose,
}) => {
  const { deck, playtest, inventoryMode, username, isNarrow } = useApp();

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
              <DeckCopyUrlButton setShowQr={setShowQr} deck={deck} />
              <DeckProxyButton
                deck={deck}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
              />
              <DeckRecommendationButton
                setShowRecommendation={setShowRecommendation}
              />
              <DeckSearchSimilarButton deck={deck} />
              <DeckDrawButton setShowDraw={setShowDraw} />
              {inventoryMode && (
                <DeckMissingButton
                  deck={deck}
                  missingCrypt={missingCrypt}
                  missingLibrary={missingLibrary}
                />
              )}
            </>
          )}
      </Stack>
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

export default DeckButtons;
