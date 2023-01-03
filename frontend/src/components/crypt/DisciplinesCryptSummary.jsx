import React from 'react';
import { ResultDisciplineImage } from 'components';
import virtuesList from 'assets/data/virtuesList.json';

const DisciplinesCryptSummary = ({ disciplinesDetailed }) => {
  const disciplinesSorted = Object.keys(disciplinesDetailed).sort((a, b) => {
    return disciplinesDetailed[b][0] - disciplinesDetailed[a][0];
  });

  let withDisciplines = false;
  let withVirtues = false;

  const DisciplinesInfo = disciplinesSorted
    .filter((d) => !virtuesList.includes(d) && disciplinesDetailed[d][0] > 0)
    .map((d, idx) => {
      withDisciplines = true;
      return (
        <div
          key={idx}
          className="inline-block items-center whitespace-nowrap pr-5"
        >
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
    });

  const VirtuesInfo = disciplinesSorted
    .filter((d) => virtuesList.includes(d) && disciplinesDetailed[d][0] > 0)
    .map((d, idx) => {
      withVirtues = true;
      return (
        <div key={idx} className="inline-block whitespace-nowrap pr-5">
          <div className="flex items-center space-x-1">
            <ResultDisciplineImage value={d} />
            <div className="flex">{disciplinesDetailed[d][1]}</div>
          </div>
        </div>
      );
    });

  return (
    <div className="space-y-2">
      {withDisciplines && <>{DisciplinesInfo}</>}
      {withVirtues && <>{VirtuesInfo}</>}
    </div>
  );
};

export default DisciplinesCryptSummary;
