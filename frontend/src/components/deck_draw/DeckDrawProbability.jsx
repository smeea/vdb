import React from 'react';
import { ConditionalTooltipOrModal, DeckDrawProbabilityText } from '@/components';
import { drawProbability } from '@/utils';

const DeckDrawProbability = ({ cardName, n, N, k }) => {
  return (
    <ConditionalTooltipOrModal
      overlay={<DeckDrawProbabilityText N={N} n={n} k={k} />}
      title={cardName}
      withMobileMargin
    >
      <div className="text-fgSecondary dark:text-fgSecondaryDark">
        {`${Math.round(drawProbability(1, N, n, k) * 100)}%`}
      </div>
    </ConditionalTooltipOrModal>
  );
};

export default DeckDrawProbability;
