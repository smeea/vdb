import React from 'react';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';

function DeckLibraryTotalInfo(props) {
  const total = Object.values(props.byTypes).reduce((a, b) => a + b, 0);

  const TypesInfo = Object.keys(props.byTypes).map((t, idx) => {
    return (
      <span key={idx} className="d-inline-block nobr pl-0 pr-3">
        <ResultLibraryType cardtype={t} />
        {props.byTypes[t]}{' '}
        <span className="gray">
          ({Math.round((props.byTypes[t] / total) * 100)}%)
        </span>
      </span>
    );
  });

  const byDisciplinesSorted = Object.keys(props.byDisciplines).sort((a, b) => {
    return props.byDisciplines[b] - props.byDisciplines[a];
  });

  const DisciplinesInfo = byDisciplinesSorted.map((d, idx) => {
    return (
      <span key={idx} className="d-inline-block nobr pl-0 pr-3">
        <ResultLibraryDisciplines value={d} />
        {props.byDisciplines[d]}{' '}
        <span className="gray">
          ({Math.round((props.byDisciplines[d] / total) * 100)}%)
        </span>
      </span>
    );
  });

  return (
    <>
      <div className="py-2">{TypesInfo}</div>
      <div className="pt-1 pb-2">{DisciplinesInfo}</div>
    </>
  );
}

export default DeckLibraryTotalInfo;
