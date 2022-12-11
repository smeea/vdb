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
        <span key={idx} className="inline-block whitespace-nowrap  ">
          <div className="flex items-center ">
            <ResultDisciplineImage
              title={`${d} Superior | Inferior`}
              superior={true}
              value={d}
            />
            <div className="flex ">
              {disciplinesDetailed[d][2]} <div className="gray ">|</div>{' '}
              {disciplinesDetailed[d][1]}
            </div>
          </div>
        </span>
      );
    });

  const VirtuesInfo = disciplinesSorted
    .filter((d) => virtuesList.includes(d) && disciplinesDetailed[d][0] > 0)
    .map((d, idx) => {
      withVirtues = true;
      return (
        <span key={idx} className="inline-block whitespace-nowrap  ">
          <div className="flex items-center ">
            <ResultDisciplineImage value={d} />
            <div className="flex ">{disciplinesDetailed[d][1]}</div>
          </div>
        </span>
      );
    });

  return (
    <>
      {withDisciplines && <div>{DisciplinesInfo}</div>}
      {withVirtues && <div>{VirtuesInfo}</div>}
    </>
  );
};

export default DisciplinesCryptSummary;
