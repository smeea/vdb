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
      <div key={idx} className="ps-0 pe-3 inline-block whitespace-nowrap">
        <div className="flex items-center">
          <ResultLibraryTypeImage value={t} />
          <div className="flex px-1">{props.byTypes[t]}</div>
          <span className="text-neutral-500">
            ({Math.round((props.byTypes[t] / total) * 100)}%)
          </span>
        </div>
      </div>
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
      <div key={idx} className="ps-0 pe-3 inline-block whitespace-nowrap">
        <div className="flex items-center">
          <ResultLibraryDisciplines value={d} />
          <div className="flex px-1">{props.byDisciplines[d]}</div>
          <span className="gray">
            ({Math.round((props.byDisciplines[d] / totalExMasters) * 100)}%)
          </span>
        </div>
      </div>
    );
  });

  const ClansInfo = byClansSorted.map((d, idx) => {
    return (
      <div key={idx} className="ps-0 pe-3 inline-block whitespace-nowrap">
        <div className="flex items-center">
          <ResultLibraryClan value={d} />
          <div className="flex px-1">{props.byClans[d]}</div>
          <span className="gray">
            ({Math.round((props.byClans[d] / total) * 100)}%)
          </span>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="py-1">{TypesInfo}</div>
      <div className="pt-1">Excluding Master / Event:</div>
      <div className="py-1">{DisciplinesInfo}</div>
      <div className="py-1">{ClansInfo}</div>
    </>
  );
}

export default DeckLibraryTotalInfo;
