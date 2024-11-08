import React from 'react';
import { ResultClanImage } from '@/components';

const ResultLibraryClan = ({ value }) => {
  if (!value) return;
  const clans = value.split('/');
  if (clans.length < 1) return;

  return (
    <>
      {clans.map((clan, idx) => (
        <React.Fragment key={idx}>
          {idx + 1 < clans.length ? (
            <>
              <ResultClanImage value={clan} />
              <div className="inline px-0.5">/</div>
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
