import React from 'react';
import { Stack } from 'react-bootstrap';
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
  DeckBranchCreateButton,
  DeckBranchDeleteButton,
  DeckPublicButton,
} from 'components';

import { useApp } from 'context';

const DeckButtons = ({
  deck,
  activeDeck,
  isPublic,
  isAuthor,
  missingCrypt,
  missingLibrary,
  setShowInfo,
  setShowDraw,
  setShowQr,
  setShowRecommendation,
}) => {
  const { inventoryMode, username } = useApp();

  return (
    <Stack gap={1}>
      <DeckImport setShowInfo={setShowInfo} />
      {deck && (
        <>
          {username && <DeckCloneButton deck={deck} activeDeck={activeDeck} />}
          <DeckExportButton deck={deck} activeDeck={activeDeck} />
          {isAuthor && !isPublic && <DeckDeleteButton deck={deck} />}
          {isAuthor && !isPublic && (
            <DeckBranchCreateButton deck={deck} activeDeck={activeDeck} />
          )}
          {isAuthor &&
            !isPublic &&
            (deck.master || (deck.branches && deck.branches.length > 0)) && (
              <DeckBranchDeleteButton deck={deck} />
            )}
          {isAuthor && <DeckPublicButton deck={deck} />}

          <DeckDiffButton deckid={deck.deckid} />
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
  );
};

export default DeckButtons;
