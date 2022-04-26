import React from 'react';
import { Stack } from 'react-bootstrap';
import { DisciplinesCryptSummary } from 'components/crypt';
import { drawUniqueProbability, countCards, countTotalCost } from 'utils';
import { CAPACITY } from 'utils/constants';

const DeckCryptTotalInfo = ({ cards, disciplinesDetailed }) => {
  const cryptTotalQ = countCards(cards);
  const cryptTotalCap = countTotalCost(cards, CAPACITY);
  const quantityList = cards.map((card) => card.q);

  const uniqueDraw = drawUniqueProbability(quantityList, 4).map((i, idx) => {
    if (i > 0 && i < 0.01) i = 0.01;
    if (i > 0.999) i = 1;

    if (i > 0) {
      return (
        <div
          className="d-inline"
          key={idx}
          title={`Chance to draw ${idx} unique vampires`}
        >
          <span className="blue">
            <b>{idx}:</b>
          </span>{' '}
          {Math.round(i * 100)}%
        </div>
      );
    }
  });

  const cryptAvg = Math.round((cryptTotalCap / cryptTotalQ) * 100) / 100;

  return (
    <>
      <div className="d-flex justify-content-between py-1">
        <div className="d-flex">
          <span className="blue pe-2">Avg. cap:</span> {cryptAvg}
        </div>
        <div className="d-flex">
          <span className="blue pe-2">Uniq:</span>
          <Stack direction="horizontal" gap={3}>
            {uniqueDraw}
          </Stack>
        </div>
      </div>
      <DisciplinesCryptSummary disciplinesDetailed={disciplinesDetailed} />
    </>
  );
};

export default DeckCryptTotalInfo;
