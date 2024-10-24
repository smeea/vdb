import React from 'react';
import {
  ReviewApplyButton,
  ReviewCopyUrlButton,
  ReviewCopyTextButton,
  DiffBackButton,
} from '@/components';

const ReviewButtons = ({ parentId, deck, urlDiff }) => {
  return (
    <div className="flex flex-col gap-1">
      <DiffBackButton parentId={parentId} />
      <ReviewCopyUrlButton deckid={deck?.deckid} urlDiff={urlDiff} />
      {urlDiff && <ReviewCopyTextButton urlDiff={urlDiff} />}
      {parentId && <ReviewApplyButton deck={deck} parentId={parentId} />}
    </div>
  );
};

export default ReviewButtons;
