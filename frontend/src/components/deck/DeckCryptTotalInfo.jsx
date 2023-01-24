import React from 'react';
import { DisciplinesCryptSummary } from '@/components/crypt';
import { useApp } from '@/context';
import { drawUniqueProbability, countCards, countTotalCost } from '@/utils';
import { CAPACITY } from '@/utils/constants';

const DeckCryptTotalInfo = ({ cards, disciplinesDetailed }) => {
  const { isMobile } = useApp();

  const cryptTotalQ = countCards(cards);
  const cryptTotalCap = countTotalCost(cards, CAPACITY);
  const quantityList = cards.map((card) => card.q);

  const uniqueDraw = drawUniqueProbability(quantityList, 4)
    .map((i, idx) => {
      if (i > 0 && i < 0.01) i = 0.01;
      if (i > 0.999) i = 1;

      if (i > 0) {
        return (
          <div className="inline" key={idx}>
            <span className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
              {idx}:
            </span>{' '}
            {Math.round(i * 100)}%
          </div>
        );
      }
    })
    .filter((i) => i);

  const cryptAvg = Math.round((cryptTotalCap / cryptTotalQ) * 100) / 100;

  return (
    <>
      <div className="flex justify-between">
        <div className="flex space-x-1" title="Average capacity">
          <div className="text-fgSecondary dark:text-fgSecondaryDark">
            Avg. cap:
          </div>
          <div>{cryptAvg}</div>
        </div>
        <div
          className="flex space-x-3"
          title="Chance to draw X unique vampires"
        >
          <div className="text-fgSecondary dark:text-fgSecondaryDark">
            Uniq:
          </div>
          <div
            className={`flex flex-row ${
              isMobile && uniqueDraw.length > 2 ? 'space-x-2' : 'space-x-3'
            }`}
          >
            {uniqueDraw}
          </div>
        </div>
      </div>
      <DisciplinesCryptSummary disciplinesDetailed={disciplinesDetailed} />
    </>
  );
};

export default DeckCryptTotalInfo;
