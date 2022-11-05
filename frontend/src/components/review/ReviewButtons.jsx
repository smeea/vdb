import React from 'react';
import { Stack } from 'react-bootstrap';
import {
  ReviewApplyButton,
  ReviewCopyUrlButton,
  DiffBackButton,
} from 'components';

const ReviewButtons = ({ parentId, deck, urlDiff }) => {
  return (
    <Stack gap={1}>
      <DiffBackButton parentId={parentId} />
      <ReviewCopyUrlButton deckid={deck?.deckid} urlDiff={urlDiff} />
      {parentId && <ReviewApplyButton deck={deck} parentId={parentId} />}
    </Stack>
  );
};

export default ReviewButtons;
