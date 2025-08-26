import {
  DeckBranchCreateButton,
  DeckBranchDeleteButton,
  DeckCloneButton,
  DeckCopyUrlButton,
  DeckDeleteButton,
  DeckDeletePlaytestButton,
  DeckDiffButton,
  DeckDrawButton,
  DeckExportButton,
  DeckImport,
  DeckMissingButton,
  DeckProxyButtonWrapper,
  DeckPublicSwitchButton,
  DeckPublicSyncButton,
  DeckPublicToggleButton,
  DeckRecommendationButton,
  DeckReviewButton,
  DeckSearchSimilarButton,
  PlaytestReportsOneButton,
  SeatingButton,
} from "@/components";
import { DECK, DECKID, ID, NAME, PLAYTEST } from "@/constants";
import { useApp } from "@/context";
import { getRestrictions } from "@/utils";

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
  const { publicChild, isPublic, isAuthor, isBranches } = deck || {};
  const { hasPlaytest } = getRestrictions(deck);
  const isPlaytestSafe = playtestMode || !hasPlaytest;

  return (
    <div className="flex flex-col gap-1">
      <DeckImport
        setShowInfo={setShowInfo}
        setShowImportAmaranth={setShowImportAmaranth}
        setShowImportText={setShowImportText}
        setBadImportCards={setBadImportCards}
      />
      {hasPlaytest && !isPlaytestSafe && isAuthor && !isPublic && (
        <>
          <DeckDeletePlaytestButton deck={deck} />
          <DeckDeleteButton deck={deck} />
        </>
      )}
      {deck && isPlaytestSafe && (
        <>
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
