import { DisciplinesCryptSummary } from '@/components';
import { ID } from '@/constants';
import { getKeyDisciplines } from '@/utils';

const ResultCryptTotalInfo = ({ cards }) => {
  const cardsById = {};
  cards.map((c) => {
    cardsById[c[ID]] = {
      c: c,
      q: 1,
    };
  });

  const { disciplinesDetailed } = getKeyDisciplines(cardsById);

  return <DisciplinesCryptSummary disciplinesDetailed={disciplinesDetailed} />;
};

export default ResultCryptTotalInfo;
