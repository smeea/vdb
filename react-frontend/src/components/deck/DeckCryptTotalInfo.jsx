import React from 'react';
import { ResultDisciplineImage } from 'components';
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

  const disciplinesSorted = Object.keys(disciplinesDetailed).sort((a, b) => {
    return disciplinesDetailed[b][0] - disciplinesDetailed[a][0];
  });

  const DisciplinesInfo = disciplinesSorted.map((d, idx) => {
    return (
      <span key={idx} className="d-inline-block nobr ps-0 pe-3">
        <div className="d-flex align-items-center">
          <ResultDisciplineImage superior={true} value={d} />
          {disciplinesDetailed[d][2]}
          {' | '}
          {disciplinesDetailed[d][1]}
          <ResultDisciplineImage value={d} />
        </div>
      </span>
    );
  });

  return (
    <>
      <div className="d-flex justify-content-between py-1">
        <div className="d-inline">
          <span className="blue">Avg. cap:</span> {cryptAvg}
        </div>
        <div className="d-inline">{uniqueDraw}</div>
      </div>
      <div className="py-1">{DisciplinesInfo}</div>
    </>
  );
};

export default DeckCryptTotalInfo;
