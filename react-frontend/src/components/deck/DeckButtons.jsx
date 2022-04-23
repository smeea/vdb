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
      {deck && (
        <>
          {username && (
            <DeckCloneButton
              deck={deck}
              activeDeck={activeDeck}
              setShowButtons={setShowButtons}
            />
          )}
          <DeckExportButton
            deck={deck}
            activeDeck={activeDeck}
            setShowButtons={setShowButtons}
          />
          {isAuthor && !isPublic && (
            <DeckDeleteButton deck={deck} setShowButtons={setShowButtons} />
          )}
          {isAuthor && !isPublic && (
            <DeckBranchCreateButton
              deck={deck}
              activeDeck={activeDeck}
              setShowButtons={setShowButtons}
            />
          )}
          {isAuthor &&
            !isPublic &&
            (deck.master || (deck.branches && deck.branches.length > 0)) && (
              <DeckBranchDeleteButton
                deck={deck}
                setShowButtons={setShowButtons}
              />
            )}
          {isAuthor && (
            <DeckPublicButton deck={deck} setShowButtons={setShowButtons} />
          )}

          <DeckDiffButton
            deckid={deck.deckid}
            setShowButtons={setShowButtons}
          />
          <DeckCopyUrlButton deck={deck} setShowButtons={setShowButtons} />
          <DeckProxyButton
            deck={deck}
            missingCrypt={missingCrypt}
            missingLibrary={missingLibrary}
            setShowInfo={setShowInfo}
            setShowButtons={setShowButtons}
            setShowProxySelect={setShowProxySelect}
          />
          <DeckRecommendationButton
            setShowRecommendation={setShowRecommendation}
            setShowButtons={setShowButtons}
          />
          <DeckSearchSimilarButton
            deck={deck}
            setShowButtons={setShowButtons}
          />
          <DeckDrawButton
            setShowDraw={setShowDraw}
            setShowButtons={setShowButtons}
          />
          {inventoryMode && (
            <DeckMissingButton
              deck={deck}
              missingCrypt={missingCrypt}
              missingLibrary={missingLibrary}
              setShowButtons={setShowButtons}
            />
          )}
        </>
      )}
    </Stack>
  );
}

export default DeckButtons;
