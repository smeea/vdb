import React from 'react';
import { DisciplinesCryptSummary } from '@/components';
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
      if (i > 0 && i < 0.02) {
        i = Math.round(i * 1000) / 10;
      } else if (i > 0.999) {
        i = 1;
      } else {
        i = Math.round(i * 100);
      }

      if (i > 0) {
        return (
          <div
            className="inline"
            key={idx}
            title="Chance to draw X unique vampires"
          >
            <span className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
              {idx}:
            </span>{' '}
            {i}%
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
        <div className="flex space-x-3">
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
