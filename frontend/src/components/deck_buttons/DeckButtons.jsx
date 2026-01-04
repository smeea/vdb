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
  DeckFreezeButton,
  DeckMissingButton,
  DeckProxyButtonWrapper,
  DeckPublicSwitchButton,
  DeckPublicSyncButton,
  DeckPublicToggleButton,
  DeckRecommendationButton,
  DeckReviewButton,
  DeckSearchSimilarButton,
  SeatingButton,
} from "@/components";
import { IS_PUBLIC, IS_BRANCHES, PUBLIC_CHILD, IS_AUTHOR, DECKID } from "@/constants";
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
  const { playtestMode, inventoryMode, username } = useApp();
  const { [PUBLIC_CHILD]: publicChild, [IS_PUBLIC]: isPublic, [IS_AUTHOR]: isAuthor, [IS_BRANCHES]: isBranches } = deck || {};
  const { hasPlaytest } = getRestrictions(deck);
  const isPlaytestSafe = playtestMode || !hasPlaytest;

  return (
    <div className="flex flex-col gap-4">
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
      {isAuthor && !isPublic && <DeckFreezeButton deck={deck} withText />}
    </div>
  );
};

export default DeckButtons;
