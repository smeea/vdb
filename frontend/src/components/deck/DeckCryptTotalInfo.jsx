import React from 'react';
import { DisciplinesCryptSummary } from 'components/crypt';
import { useApp } from 'context';
import { drawUniqueProbability, countCards, countTotalCost } from 'utils';
import { CAPACITY } from 'utils/constants';

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
            <span className="blue">
              <b>{idx}:</b>
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
      <div className="flex justify-between py-1">
        <div className="flex pe-2" title="Average capacity">
          <span className="blue pe-2">Avg. cap:</span> {cryptAvg}
        </div>
        <div title="Chance to draw X unique vampires" className="flex">
          <span className="blue pe-2 pe-md-3">Uniq:</span>
          <div
            className="flex flex-row space-x-2"
            //  gap={isMobile && uniqueDraw.length > 2 ? 2 : 3}
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
