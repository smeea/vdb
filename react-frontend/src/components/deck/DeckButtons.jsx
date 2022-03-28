import React from 'react';
import { Stack } from 'react-bootstrap';
import {
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
        <DeckCloneButton
          deck={deck}
          activeDeck={activeDeck}
          setShowButtons={setShowButtons}
        />
      )}
      {deck && (
        <DeckExportButton
          deck={deck}
          activeDeck={activeDeck}
          setShowButtons={setShowButtons}
        />
      )}
      {isAuthor && !isPublic && deck && (
        <DeckDeleteButton deck={deck} setShowButtons={setShowButtons} />
      )}
      {isAuthor && !isPublic && deck && (
        <DeckBranchCreateButton
          deck={deck}
          activeDeck={activeDeck}
          setShowButtons={setShowButtons}
        />
      )}
      {isAuthor &&
        !isPublic &&
        deck &&
        (deck.master || (deck.branches && deck.branches.length > 0)) && (
          <DeckBranchDeleteButton deck={deck} setShowButtons={setShowButtons} />
        )}
      {isAuthor && deck && (
        <DeckPublicButton deck={deck} setShowButtons={setShowButtons} />
      )}

      {deck && (
        <DeckDiffButton deckid={deck.deckid} setShowButtons={setShowButtons} />
      )}
      {deck && (
        <DeckCopyUrlButton deck={deck} setShowButtons={setShowButtons} />
      )}
      {deck && (
        <DeckProxyButton
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
        <DeckMissingButton
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
