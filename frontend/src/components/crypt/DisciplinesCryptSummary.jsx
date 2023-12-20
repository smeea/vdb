import React from 'react';
import { ResultDisciplineImage } from '@/components';
import virtuesList from '@/assets/data/virtuesList.json';

const DisciplinesCryptSummary = ({ disciplinesDetailed }) => {
  const disciplinesSorted = Object.keys(disciplinesDetailed).sort((a, b) => {
    return disciplinesDetailed[b][0] - disciplinesDetailed[a][0];
  });

  const withVirtues = disciplinesSorted.some(
    (d) => virtuesList[d] && disciplinesDetailed[d][0] > 0,
  );
  const withDisciplines = disciplinesSorted.some(
    (d) => !virtuesList[d] && disciplinesDetailed[d][0] > 0,
  );

  return (
    <div className="space-y-2">
      {withDisciplines &&
        disciplinesSorted
          .filter((d) => !virtuesList[d] && disciplinesDetailed[d][0] > 0)
          .map((d, idx) => {
            return (
              <div key={idx} className="inline-block whitespace-nowrap pr-5">
                <div className="flex items-center space-x-1">
                  <ResultDisciplineImage
                    title={`${d} Superior | Inferior`}
                    superior={true}
                    value={d}
                  />
                  <div>{disciplinesDetailed[d][2]}</div>
                  <div className="text-midGray dark:text-midGrayDark">|</div>
                  <div>{disciplinesDetailed[d][1]}</div>
                </div>
              </div>
            );
          })}
      {withVirtues &&
        disciplinesSorted
          .filter((d) => virtuesList[d] && disciplinesDetailed[d][0] > 0)
          .map((d, idx) => {
            return (
              <div key={idx} className="inline-block whitespace-nowrap pr-5">
                <div className="flex items-center space-x-1">
                  <ResultDisciplineImage value={d} />
                  <div className="flex">{disciplinesDetailed[d][1]}</div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default DisciplinesCryptSummary;
