import React from 'react';
import { Stack } from 'react-bootstrap';
import { DiffCopyUrlButton, DiffBackButton } from 'components';

const ReviewButtons = ({ deck }) => {
  return (
    <Stack gap={1}>
      {deck && (
        <>
          <DiffBackButton deckid={deck.deckid} />
          {/* <DiffCopyUrlButton fromQuery={fromQuery} toQuery={toQuery} /> */}
        </>
      )}
    </Stack>
  );
};

export default ReviewButtons;
