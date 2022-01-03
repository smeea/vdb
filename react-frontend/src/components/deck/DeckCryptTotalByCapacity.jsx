import React from 'react';
import { drawUniqueProbability, countCards, countTotalCost } from 'utils';
import { CAPACITY } from 'utils/constants';

const DeckCryptTotalByCapacity = ({ cards }) => {
  const cryptTotalQ = countCards(cards);
  const cryptTotalCap = countTotalCost(cards, CAPACITY);
  const quantityList = cards.map((card) => card.q);

  const uniqueDraw = drawUniqueProbability(quantityList, 4).map((i, idx) => {
    if (i > 0 && i < 0.01) i = 0.01;
    if (i > 0.999) i = 1;

    if (i > 0) {
      return (
        <div
          className="d-inline ps-3"
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
    <div className="d-flex justify-content-between">
      <div className="d-inline">
        <span className="blue">Avg. cap:</span> {cryptAvg}
      </div>
      <div className="d-inline">{uniqueDraw}</div>
    </div>
  );
};

export default DeckCryptTotalByCapacity;
