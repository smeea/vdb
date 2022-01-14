import React from 'react';
import { Stack } from 'react-bootstrap';
import {
  DeckClone,
  DeckDelete,
  DeckCopyUrl,
  DeckImport,
  DeckImportAnonymous,
  DeckExport,
  DeckProxy,
  DeckMissing,
  DeckRecommendationButton,
  DeckDrawButton,
  DeckDiffButton,
  DeckBranchCreate,
  DeckBranchDelete,
} from 'components';

import { useApp } from 'context';

function DeckButtons(props) {
  const { inventoryMode, username } = useApp();

  return (
    <Stack gap={1}>
      {username && (
        <DeckImport
          setShowInfo={props.setShowInfo}
          setShowButtons={props.setShowButtons}
        />
      )}
      <DeckImportAnonymous
        setShowInfo={props.setShowInfo}
        setShowButtons={props.setShowButtons}
      />
      {username && props.deck && (
        <DeckClone
          deck={props.deck}
          activeDeck={props.activeDeck}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.deck && (
        <DeckExport
          deck={props.deck}
          activeDeck={props.activeDeck}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.isAuthor && props.deck && (
        <DeckDelete deck={props.deck} setShowButtons={props.setShowButtons} />
      )}
      {props.isAuthor && props.deck && (
        <DeckBranchCreate
          deck={props.deck}
          activeDeck={props.activeDeck}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.isAuthor &&
        props.deck &&
        (props.deck.master ||
          (props.deck.branches && props.deck.branches.length > 0)) && (
          <DeckBranchDelete
            deck={props.deck}
            setShowButtons={props.setShowButtons}
          />
        )}
      {props.deck && (
        <DeckDiffButton
          deckid={props.deck.deckid}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.deck && (
        <DeckCopyUrl
          isAuthor={props.isAuthor}
          deck={props.deck}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.deck && (
        <DeckProxy
          deck={props.deck}
          missingCrypt={props.missingCrypt}
          missingLibrary={props.missingLibrary}
          setShowInfo={props.setShowInfo}
          setShowButtons={props.setShowButtons}
          setShowProxySelect={props.setShowProxySelect}
        />
      )}
      {props.deck && (
        <DeckDrawButton
          setShowDraw={props.setShowDraw}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.deck && (
        <DeckRecommendationButton
          setShowRecommendation={props.setShowRecommendation}
          setShowButtons={props.setShowButtons}
        />
      )}
      {props.deck && inventoryMode && (
        <DeckMissing
          deck={props.deck}
          missingCrypt={props.missingCrypt}
          missingLibrary={props.missingLibrary}
          setShowButtons={props.setShowButtons}
        />
      )}
    </Stack>
  );
}

export default DeckButtons;
