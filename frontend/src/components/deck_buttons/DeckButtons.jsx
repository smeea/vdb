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
  PlaytestReportsOneButton,
} from '@/components';
import { useApp } from '@/context';
import { getIsPlaytest } from '@/utils';
import { PLAYTEST, CRYPT, LIBRARY, DECK, DECKID, NAME, ID } from '@/constants';

const DeckButtons = ({
  deck,
  setShowInfo,
  setShowDraw,
  setShowSeating,
  setQrUrl,
  setShowMissing,
  setShowRecommendation,
  setShowProxySelect,
  setShowImportAmaranth,
  setShowImportText,
  setBadImportCards,
}) => {
  const { isPlaytestAdmin, playtestMode, inventoryMode, username } = useApp();
  const { publicChild, isPublic, isAuthor, isBranches } = deck;

  const playtestPrecon =
    deck?.[DECKID].includes(`${PLAYTEST}:`) && deck[DECKID].replace(`${PLAYTEST}:`, '');
  const hasPlaytest =
    deck &&
    Object.keys({ ...deck[CRYPT], ...deck[LIBRARY] }).some((cardid) => getIsPlaytest(cardid));

  const isPlaytestSafe = playtestMode || !hasPlaytest;

  return (
    <div className="flex flex-col gap-1">
      <DeckImport
        setShowInfo={setShowInfo}
        setShowImportAmaranth={setShowImportAmaranth}
        setShowImportText={setShowImportText}
        setBadImportCards={setBadImportCards}
      />
      {hasPlaytest && !isPlaytestSafe && isAuthor && !isPublic && <DeckDeleteButton deck={deck} />}
      {deck && isPlaytestSafe && (
        <>
          {playtestMode && playtestPrecon && isPlaytestAdmin && (
            <PlaytestReportsOneButton
              value={{ [DECK]: deck, [NAME]: deck[NAME], [ID]: playtestPrecon }}
              isPrecon
            />
          )}
          {username && <DeckCloneButton deck={deck} />}
          <DeckExportButton deck={deck} />
          {isAuthor && (
            <>
              {!isPublic && <DeckDeleteButton deck={deck} />}
              {!isPublic && <DeckBranchCreateButton deck={deck} />}
              {!isPublic && isBranches && <DeckBranchDeleteButton deck={deck} />}
              {(isPublic || publicChild) && <DeckPublicSwitchButton deck={deck} />}
              {isPublic && <DeckPublicSyncButton deck={deck} />}
              {!publicChild && <DeckPublicToggleButton deck={deck} />}
            </>
          )}
          <DeckDiffButton deckid={deck[DECKID]} />
          <DeckReviewButton deck={deck} />
          <DeckCopyUrlButton setQrUrl={setQrUrl} deck={deck} />
          <DeckProxyButtonWrapper deck={deck} setShowProxySelect={setShowProxySelect} />
          <DeckRecommendationButton setShowRecommendation={setShowRecommendation} />
          <DeckSearchSimilarButton deck={deck} />
          <DeckDrawButton setShow={setShowDraw} />
          {inventoryMode && <DeckMissingButton setShow={setShowMissing} />}
        </>
      )}
      <SeatingButton setShow={setShowSeating} />
    </div>
  );
};

export default DeckButtons;
