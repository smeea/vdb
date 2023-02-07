import React from 'react';
import { ResultClanImage } from '@/components';

const ResultLibraryClan = ({ value }) => {
  const clans = value.split('/');
  return (
    <>
      {clans.map((clan, idx) => (
        <React.Fragment key={idx}>
          {idx + 1 < clans.length ? (
            <>
              <ResultClanImage value={clan} />
              <div className="px-0.5">/</div>
            </>
          ) : (
            <ResultClanImage value={clan} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default ResultLibraryClan;
