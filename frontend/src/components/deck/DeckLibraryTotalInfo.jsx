import React from 'react';
import { ResultLibraryTypeImage, ResultLibraryDisciplines, ResultLibraryClan } from '@/components';
import { TYPE_MASTER } from '@/constants';

const DeckLibraryTotalInfo = ({ byClans, byTypes, byDisciplines }) => {
  const total = Object.values(byTypes).reduce((a, b) => a + b, 0);
  const totalExMasters = total - (byTypes[TYPE_MASTER] || 0);

  const byDisciplinesSorted = byDisciplines
    ? Object.keys(byDisciplines).toSorted((a, b) => {
        return byDisciplines[b] - byDisciplines[a];
      })
    : [];

  const byClansSorted = byClans
    ? Object.keys(byClans).toSorted((a, b) => {
        return byClans[b] - byClans[a];
      })
    : [];

  return (
    <div className="flex flex-col gap-2 bg-bgSecondary p-2 dark:bg-bgSecondaryDark">
      <div>
        {Object.keys(byTypes).map((t, idx) => {
          return (
            <div key={idx} className="inline-block whitespace-nowrap pr-5">
              <div className="flex items-center gap-0.5">
                <ResultLibraryTypeImage value={t} />
                <div className="flex">{byTypes[t]}</div>
                <div className="text-midGray dark:text-midGrayDark">
                  ({Math.round((byTypes[t] / total) * 100)}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-fgSecondary dark:text-fgSecondaryDark">Excluding Master / Event:</div>
        <div>
          {byDisciplinesSorted.map((d, idx) => {
            return (
              <div key={idx} className="inline-block whitespace-nowrap pr-5">
                <div className="flex items-center gap-0.5">
                  <ResultLibraryDisciplines value={d} />
                  <div className="flex">{byDisciplines[d]}</div>
                  <div className="text-midGray dark:text-midGrayDark">
                    ({Math.round((byDisciplines[d] / totalExMasters) * 100)}
                    %)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {byClansSorted.length > 0 && (
        <div>
          {byClansSorted.map((d, idx) => {
            return (
              <div key={idx} className="inline-block whitespace-nowrap pr-5">
                <div className="flex items-center gap-0.5">
                  <ResultLibraryClan value={d} />
                  <div className="flex">{byClans[d]}</div>
                  <div className="text-midGray dark:text-midGrayDark">
                    ({Math.round((byClans[d] / total) * 100)}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeckLibraryTotalInfo;
