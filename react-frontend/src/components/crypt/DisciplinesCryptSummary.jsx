import React from 'react';
import { ResultDisciplineImage } from 'components';
import virtuesList from 'components/deck/forms_data/virtuesList.json';

const DisciplinesCryptSummary = ({ disciplinesDetailed }) => {
  const disciplinesSorted = Object.keys(disciplinesDetailed).sort((a, b) => {
    return disciplinesDetailed[b][0] - disciplinesDetailed[a][0];
  });

  let withDisciplines = false;
  let withVirtues = false;

  const DisciplinesInfo = disciplinesSorted
    .filter((d) => !virtuesList.includes(d))
    .map((d, idx) => {
      withDisciplines = true;
      return (
        <span key={idx} className="d-inline-block nobr ps-0 pe-3">
          <div className="d-flex align-items-center">
            {Object.keys(disciplinesDetailed[d]).length > 2 ? (
              <>
                <ResultDisciplineImage
                  title={`${d} Superior | Inferior`}
                  superior={true}
                  value={d}
                />
                {disciplinesDetailed[d][2]} | {disciplinesDetailed[d][1]}
              </>
            ) : (
              <>
                <ResultDisciplineImage value={d} /> {disciplinesDetailed[d][1]}
              </>
            )}
          </div>
        </span>
      );
    });

  const VirtuesInfo = disciplinesSorted
    .filter((d) => virtuesList.includes(d))
    .map((d, idx) => {
      withVirtues = true;
      return (
        <span key={idx} className="d-inline-block nobr ps-0 pe-3">
          <div className="d-flex align-items-center">
            {Object.keys(disciplinesDetailed[d]).length > 2 ? (
              <>
                <ResultDisciplineImage
                  title={`${d} Superior | Inferior`}
                  superior={true}
                  value={d}
                />
                {disciplinesDetailed[d][2]} | {disciplinesDetailed[d][1]}
              </>
            ) : (
              <>
                <ResultDisciplineImage value={d} /> {disciplinesDetailed[d][1]}
              </>
            )}
          </div>
        </span>
      );
    });

  return (
    <>
      {withDisciplines && <div className="py-1">{DisciplinesInfo}</div>}
      {withVirtues && <div className="py-1">{VirtuesInfo}</div>}
    </>
  );
};

export default DisciplinesCryptSummary;
