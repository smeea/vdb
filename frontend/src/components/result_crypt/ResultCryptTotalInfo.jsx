import React from 'react';
import { DisciplinesCryptSummary } from 'components';
import { useKeyDisciplines } from 'hooks';

const ResultCryptTotalInfo = ({ cards }) => {
  const cardsById = {};
  cards.map((c) => {
    cardsById[c.Id] = {
      c: c,
      q: 1,
    };
  });

  const { disciplinesDetailed } = useKeyDisciplines(cardsById);

  return (
    <>
      <DisciplinesCryptSummary disciplinesDetailed={disciplinesDetailed} />
    </>
  );
};

export default ResultCryptTotalInfo;
