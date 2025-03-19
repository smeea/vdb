import sectsOpts from '@/assets/data/sectsList.json';
import { ResultCryptTitle } from '@/components';
import {
  ARCHBISHOP,
  BARON,
  BISHOP,
  CAPACITY,
  CARDINAL,
  INNER_CIRCLE,
  JUSTICAR,
  MAGAJI,
  PRIMOGEN,
  PRINCE,
  PRISCUS,
  REGENT,
  TITLED,
  VOTE_1,
  VOTE_2,
} from '@/constants';
import { capitalize } from '@/utils';

const TitlesReq = ({ value }) => {
  if (value.length < 1) return;
  const htmlTitle = value.map((v) => capitalize(v)).join(' or ');

  return (
    <div title={htmlTitle} className="text-fg-fgSecondary dark:text-fgSecondaryDark">
      <ResultCryptTitle value={value[0]} noTitle />
      {value.length > 1 && '+'}
    </div>
  );
};

const SectReq = ({ value }) => {
  if (value.length < 1) return;
  const htmlTitle = value.map((v) => capitalize(v)).join(' or ');

  return (
    <div title={htmlTitle} className="text-fgGreen dark:text-fgGreenDark inline">
      {value.map((v) => v[0].charAt(0).toUpperCase()).join('-')}
    </div>
  );
};

const CapacityReq = ({ value }) => {
  if (!value) return;
  const matches = [...value.matchAll(/capacity (\d+) or (more|less)/g)];

  return (
    <div title={capitalize(value)}>
      {matches[0][2] === 'less' ? '≤' : '≥'}
      {matches[0][1]}
    </div>
  );
};

const ResultLibraryRequirements = ({ value }) => {
  const requirements = value.split(',');
  const titlesOpts = [
    PRIMOGEN,
    PRINCE,
    JUSTICAR,
    INNER_CIRCLE,
    BARON,
    VOTE_1,
    VOTE_2,
    BISHOP,
    ARCHBISHOP,
    PRISCUS,
    CARDINAL,
    REGENT,
    MAGAJI,
    TITLED,
  ];

  const capacityReq = requirements.find((i) => i.includes(CAPACITY));
  const titleReq = requirements.filter((i) => titlesOpts.includes(i));
  const sectReq = requirements.filter((i) => sectsOpts.includes(capitalize(i)));
  const hasRequirements = capacityReq || titleReq.length > 0 || sectReq.length > 0;

  if (hasRequirements) {
    return (
      <>
        <div className="flex gap-1">
          <CapacityReq value={capacityReq} />
          <TitlesReq value={titleReq} />
          {sectReq.length > 0 && (titleReq.length == 0 || titleReq[0] == 'titled') && (
            <SectReq value={sectReq} />
          )}
        </div>
      </>
    );
  } else return;
};

export default ResultLibraryRequirements;
