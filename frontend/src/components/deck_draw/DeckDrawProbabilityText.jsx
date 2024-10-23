import React from 'react';
import { drawProbability } from '@/utils';

const DeckDrawProbabilityText = ({ N, n, k }) => {
  return (
    <div className="flex flex-col items-start text-fgSecondary dark:text-fgSecondaryDark">
      {[1, 2, 3, 4].map((i) => {
        return (
          <div key={i} className="flex w-full justify-between gap-3">
            <div>{i}+</div>
            <div>{`${Math.round(drawProbability(i, N, n, k) * 100)}%`}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DeckDrawProbabilityText;
