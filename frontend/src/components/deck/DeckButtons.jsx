import React from 'react';
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
  ButtonFloat,
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
      <div className="flex flex-col space-y-1">
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
      </div>
      {isNarrow && (
        <ButtonFloat onClick={handleClose} variant="bg-[#a06060] opacity-80">
          <X width="40" height="40" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default DeckButtons;
