import React from 'react';
import { Stack } from 'react-bootstrap';
import { ReviewCopyUrlButton, DiffBackButton } from 'components';

const ReviewButtons = ({ mainDeck, deck, urlDiff }) => {
  return (
    <Stack gap={1}>
      {deck && (
        <>
          <DiffBackButton deckid={mainDeck.deckid} />
          <ReviewCopyUrlButton deckid={deck.deckid} urlDiff={urlDiff} />
        </>
      )}
    </Stack>
  );
};

export default ReviewButtons;
