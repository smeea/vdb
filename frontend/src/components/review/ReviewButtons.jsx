import React from 'react';
import { Stack } from 'react-bootstrap';
import { ReviewCopyUrlButton, DiffBackButton } from 'components';

const ReviewButtons = ({ backDeckid, deckid, urlDiff }) => {
  return (
    <Stack gap={1}>
      {backDeckid && <DiffBackButton deckid={backDeckid} />}
      <ReviewCopyUrlButton deckid={deckid} urlDiff={urlDiff} />
    </Stack>
  );
};

export default ReviewButtons;
