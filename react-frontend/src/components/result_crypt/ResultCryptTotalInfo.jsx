import React from 'react';
import { DisciplinesCryptSummary } from 'components/crypt';
import { useKeyDisciplines } from 'hooks';

const ResultCryptTotalInfo = ({ cards }) => {
  const cardsById = {};
  cards.map((c) => {
    cardsById[c.Id] = {
      c: c,
      q: 1,
    };
  });

  const { disciplinesDetailed } = useKeyDisciplines(
    cardsById,
    Object.keys(cardsById).length
  );

  return (
    <>
      <DisciplinesCryptSummary disciplinesDetailed={disciplinesDetailed} />
    </>
  );
};

export default ResultCryptTotalInfo;
