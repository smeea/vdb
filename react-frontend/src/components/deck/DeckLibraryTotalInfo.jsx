import React from 'react';
import {
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultLibraryClan,
} from 'components';

function DeckLibraryTotalInfo(props) {
  const total = Object.values(props.byTypes).reduce((a, b) => a + b, 0);
  const totalExMasters = total - (props.byTypes['Master'] || 0);

  const TypesInfo = Object.keys(props.byTypes).map((t, idx) => {
    return (
      <span key={idx} className="d-inline-block nobr ps-0 pe-3">
        <div className="d-flex align-items-center">
          <ResultLibraryTypeImage value={t} />
          {props.byTypes[t]}{' '}
          <span className="gray">
            ({Math.round((props.byTypes[t] / total) * 100)}%)
          </span>
        </div>
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
    console.log(d);
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
            {/* <ResultDisciplineImage value={d} /> */}
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
        <div className="d-flex align-items-center">
          <ResultLibraryClan value={d} /> {props.byClans[d]}{' '}
          <span className="gray">
            ({Math.round((props.byClans[d] / total) * 100)}%)
          </span>
        </div>
      </span>
    );
  });

  return (
    <>
      <div className="py-1">{TypesInfo}</div>
      <div className="pt-1">Excluding Masters:</div>
      <div className="py-1">{DisciplinesInfo}</div>
      <div className="pb-2">{ClansInfo}</div>
    </>
  );
}

export default DeckLibraryTotalInfo;
