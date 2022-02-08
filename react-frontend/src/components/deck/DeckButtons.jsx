import React from 'react';
import { Stack } from 'react-bootstrap';
import {
  DeckClone,
  DeckDelete,
  DeckCopyUrl,
  DeckImport,
  DeckExport,
  DeckProxy,
  DeckMissing,
  DeckRecommendationButton,
  DeckDrawButton,
  DeckDiffButton,
  DeckBranchCreate,
  DeckBranchDelete,
  DeckTogglePublic,
} from 'components';

import { useApp } from 'context';

function DeckButtons({
  deck,
  activeDeck,
  isPublic,
  isAuthor,
  missingCrypt,
  missingLibrary,
  setShowInfo,
  setShowButtons,
  setShowProxySelect,
  setShowDraw,
  setShowRecommendation,
}) {
  const { inventoryMode, username } = useApp();

  return (
    <Stack gap={1}>
      <DeckImport setShowInfo={setShowInfo} setShowButtons={setShowButtons} />
      {username && deck && (
        <DeckClone
          deck={deck}
          activeDeck={activeDeck}
          setShowButtons={setShowButtons}
        />
      )}
      {deck && (
        <DeckExport
          deck={deck}
          activeDeck={activeDeck}
          setShowButtons={setShowButtons}
        />
      )}
      {isAuthor && !isPublic && deck && (
        <DeckDelete deck={deck} setShowButtons={setShowButtons} />
      )}
      {isAuthor && !isPublic && deck && (
        <DeckBranchCreate
          deck={deck}
          activeDeck={activeDeck}
          setShowButtons={setShowButtons}
        />
      )}
      {isAuthor &&
        !isPublic &&
        deck &&
        (deck.master || (deck.branches && deck.branches.length > 0)) && (
          <DeckBranchDelete deck={deck} setShowButtons={setShowButtons} />
        )}
      {isAuthor && deck && (
        <DeckTogglePublic deck={deck} setShowButtons={setShowButtons} />
      )}
      {deck && (
        <DeckDiffButton deckid={deck.deckid} setShowButtons={setShowButtons} />
      )}
      {deck && <DeckCopyUrl deck={deck} setShowButtons={setShowButtons} />}
      {deck && (
        <DeckProxy
          deck={deck}
          missingCrypt={missingCrypt}
          missingLibrary={missingLibrary}
          setShowInfo={setShowInfo}
          setShowButtons={setShowButtons}
          setShowProxySelect={setShowProxySelect}
        />
      )}
      {deck && (
        <DeckDrawButton
          setShowDraw={setShowDraw}
          setShowButtons={setShowButtons}
        />
      )}
      {deck && (
        <DeckRecommendationButton
          setShowRecommendation={setShowRecommendation}
          setShowButtons={setShowButtons}
        />
      )}
      {deck && inventoryMode && (
        <DeckMissing
          deck={deck}
          missingCrypt={missingCrypt}
          missingLibrary={missingLibrary}
          setShowButtons={setShowButtons}
        />
      )}
    </Stack>
  );
}

export default DeckButtons;
