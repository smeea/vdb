import {
  DiffBackButton,
  ReviewApplyButton,
  ReviewCopyTextButton,
  ReviewCopyUrlButton,
} from '@/components';
import { DECKID } from '@/constants';

const ReviewButtons = ({ parentId, deck, urlDiff }) => {
  return (
    <div className="flex flex-col gap-1">
      <DiffBackButton parentId={parentId} />
      <ReviewCopyUrlButton deckid={deck?.[DECKID]} urlDiff={urlDiff} />
      {urlDiff && <ReviewCopyTextButton urlDiff={urlDiff} />}
      {parentId && <ReviewApplyButton deck={deck} parentId={parentId} />}
    </div>
  );
};

export default ReviewButtons;
