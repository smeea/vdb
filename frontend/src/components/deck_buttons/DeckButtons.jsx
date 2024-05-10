import React from 'react';
import {
  DeckSearchSimilarButton,
  DeckCloneButton,
  DeckDeleteButton,
  DeckCopyUrlButton,
  DeckImport,
  DeckExportButton,
  DeckProxyButtonWrapper,
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
  PlaytestReportExportButton,
} from '@/components';
import { useApp } from '@/context';

const DeckButtons = ({
  deck,
  setShowInfo,
  setShowDraw,
  setShowSeating,
  setQrUrl,
  setShowRecommendation,
}) => {
  const { isPlaytestAdmin, playtestMode, inventoryMode, username } = useApp();
  const { publicChild, isPublic, isAuthor, isBranches } = { ...deck };

  const playtestPrecon = deck?.deckid.includes('PLAYTEST:') && deck.deckid.replace('PLAYTEST:', '');

  return (
    <div className="flex flex-col gap-1">
      <DeckImport setShowInfo={setShowInfo} />
      {deck &&
        (playtestMode ||
          !(
            Object.keys(deck.crypt).some((cardid) => cardid > 210000) ||
            Object.keys(deck.library).some((cardid) => cardid > 110000)
          )) && (
          <>
            {playtestPrecon && isPlaytestAdmin && (
              <PlaytestReportExportButton
                value={{ deck: deck, Name: deck.name, Id: playtestPrecon }}
                isPrecon
              />
            )}
            {username && <DeckCloneButton deck={deck} />}
            <DeckExportButton deck={deck} />
            {isAuthor && !isPublic && <DeckDeleteButton deck={deck} />}
            {isAuthor && !isPublic && <DeckBranchCreateButton deck={deck} />}
            {isAuthor && !isPublic && isBranches && <DeckBranchDeleteButton deck={deck} />}
            {(isPublic || publicChild) && <DeckPublicSwitchButton deck={deck} />}
            {isPublic && <DeckPublicSyncButton deck={deck} />}
            {isAuthor && !publicChild && <DeckPublicToggleButton deck={deck} />}
            <DeckDiffButton deckid={deck.deckid} />
            <DeckReviewButton deck={deck} />
            <DeckCopyUrlButton setQrUrl={setQrUrl} deck={deck} />
            <DeckProxyButtonWrapper deck={deck} />
            <DeckRecommendationButton setShowRecommendation={setShowRecommendation} />
            <DeckSearchSimilarButton deck={deck} />
            <DeckDrawButton setShow={setShowDraw} />
            {inventoryMode && <DeckMissingButton deck={deck} />}
          </>
        )}
      <SeatingButton setShow={setShowSeating} />
    </div>
  );
};

export default DeckButtons;
