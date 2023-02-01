import React from 'react';
import {
  ConditionalTooltipOrModal,
  DeckDrawProbabilityText,
} from '@/components';
import { useApp } from '@/context';
import { drawProbability } from '@/utils';

const DeckDrawProbability = ({ cardName, n, N, k }) => {
  const { isMobile } = useApp();

  return (
    <ConditionalTooltipOrModal
      disabled={isMobile}
      overlay={<DeckDrawProbabilityText N={N} n={n} k={k} />}
      title={cardName}
    >
      <div className="text-fgSecondary dark:text-fgSecondaryDark">
        {`${Math.floor(drawProbability(1, N, n, k) * 100)}%`}
      </div>
    </ConditionalTooltipOrModal>
  );
};

export default DeckDrawProbability;
