import React from 'react';
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
  DeckPublicSwitchButton,
  DeckPublicSyncButton,
  DeckPublicToggleButton,
  SeatingButton,
} from '@/components';
import { useApp } from '@/context';

const DeckButtons = ({
  deck,
  missingCrypt,
  missingLibrary,
  setShowInfo,
  setShowDraw,
  setShowSeating,
  setQrUrl,
  setShowRecommendation,
}) => {
  const { playtest, inventoryMode, username } = useApp();
  const { publicChild, isPublic, isAuthor, isBranches } = { ...deck };

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
              {(isPublic || publicChild) && (
                <DeckPublicSwitchButton deck={deck} />
              )}
              {isPublic && <DeckPublicSyncButton deck={deck} />}
              {isAuthor && !publicChild && (
                <DeckPublicToggleButton deck={deck} />
              )}
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
    </>
  );
};

export default DeckButtons;
