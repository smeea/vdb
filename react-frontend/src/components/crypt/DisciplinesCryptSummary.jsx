import React from 'react';
import { ResultDisciplineImage } from 'components';

const DisciplinesCryptSummary = ({ disciplinesDetailed }) => {
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

  return <>{DisciplinesInfo}</>;
};

export default DisciplinesCryptSummary;
