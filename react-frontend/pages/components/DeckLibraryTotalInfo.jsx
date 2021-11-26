import React from 'react';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';

function DeckLibraryTotalInfo(props) {
  const total = Object.values(props.byTypes).reduce((a, b) => a + b, 0);
  const totalExMasters = total - (props.byTypes['Master'] || 0);

  const TypesInfo = Object.keys(props.byTypes).map((t, idx) => {
    return (
      <span key={idx} className="d-inline-block nobr ps-0 pe-3">
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

  const byClansSorted = Object.keys(props.byClans).sort((a, b) => {
    return props.byClans[b] - props.byClans[a];
  });

  const DisciplinesInfo = byDisciplinesSorted.map((d, idx) => {
    return (
      <span key={idx} className="d-inline-block nobr ps-0 pe-3">
        {d === 'any' ? (
          <>
            <span title="No Disciplines">
              <b>ND</b>
            </span>{' '}
            {props.byDisciplines['any']}{' '}
          </>
        ) : (
          <>
            <ResultLibraryDisciplines value={d} />
            {props.byDisciplines[d]}{' '}
          </>
        )}
        <span className="gray">
          ({Math.round((props.byDisciplines[d] / totalExMasters) * 100)}%)
        </span>
      </span>
    );
  });

  const ClansInfo = byClansSorted.map((d, idx) => {
    return (
      <span key={idx} className="d-inline-block nobr ps-0 pe-3">
        <ResultLibraryClan value={d} />
        {props.byClans[d]}{' '}
        <span className="gray">
          ({Math.round((props.byClans[d] / total) * 100)}%)
        </span>
      </span>
    );
  });

  return (
    <>
      <div className="py-2">{TypesInfo}</div>
      <div className="pt-2">Excluding Masters:</div>
      <div className="py-1">{DisciplinesInfo}</div>
      <div className="pb-2">{ClansInfo}</div>
    </>
  );
}

export default DeckLibraryTotalInfo;
