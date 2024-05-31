import React from 'react';
import { ResultCryptTitle } from '@/components';

const TitlesReq = ({ value }) => {
  const titles = value
    .map((v) => {
      return v.charAt(0).toUpperCase() + v.slice(1);
    })
    .join(', ');

  return (
    <div title={titles} className="text-fg-fgSecondary dark:text-fgSecondaryDark">
      <ResultCryptTitle value={value[0]} noTitle />
      {value.length > 1 && '+'}
    </div>
  );
};

const CapacityReq = ({ value }) => {
  const matches = [...value.matchAll(/capacity (\d+) or (more|less)/g)];

  return (
    <div title={value}>
      {matches[0][2] === 'less' ? '≤' : '≥'}
      {matches[0][1]}
    </div>
  );
};

const ResultRequirements = ({ value, withClanDiscipline }) => {
  const requirements = value.split(',');
  const validTitles = [
    'primogen',
    'prince',
    'justicar',
    'inner circle',
    'baron',
    '1 vote',
    '2 votes',
    'bishop',
    'archbishop',
    'priscus',
    'cardinal',
    'regent',
    'magaji',
  ];

  const capacityReq = requirements.find((i) => i.includes('capacity'));
  const titleReq = requirements.filter((i) => validTitles.includes(i));
  const withTrailingSpace = withClanDiscipline && (capacityReq || titleReq.length > 0);

  return (
    <>
      {withTrailingSpace && <>&nbsp;</>}
      {capacityReq && <CapacityReq value={capacityReq} />}
      {titleReq.length > 0 && <TitlesReq value={titleReq} />}
    </>
  );
};

export default ResultRequirements;
