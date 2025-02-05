import React from 'react';
import { Checkbox } from '@/components';
import {
  PRIMOGEN,
  PRINCE,
  NON_TITLED,
  JUSTICAR,
  INNER_CIRCLE,
  BARON,
  BISHOP,
  ARCHBISHOP,
  PRISCUS,
  CARDINAL,
  REGENT,
  MAGAJI,
  VOTE_1,
  VOTE_2,
  TITLE,
} from '@/constants';

const CryptSearchFormTitles = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Title:</div>
      <div className="flex">
        <div className="flex basis-5/9 flex-col gap-0.5">
          {[
            ['Primogen', PRIMOGEN],
            ['Prince', PRINCE],
            ['Justicar', JUSTICAR],
            ['Inner Circle', INNER_CIRCLE],
            ['Baron', BARON],
            ['1 vote (titled)', VOTE_1],
            ['2 votes (titled)', VOTE_2],
          ].map((i) => (
            <Checkbox
              key={i[1]}
              name={TITLE}
              value={i[1]}
              label={i[0]}
              checked={value[i[1]]}
              onChange={onChange}
            />
          ))}
        </div>
        <div className="flex basis-4/9 flex-col gap-0.5">
          {[
            ['Bishop', BISHOP],
            ['Archbishop', ARCHBISHOP],
            ['Priscus', PRISCUS],
            ['Cardinal', CARDINAL],
            ['Regent', REGENT],
            ['Magaji', MAGAJI],
            ['Non-titled', NON_TITLED],
          ].map((i) => (
            <Checkbox
              key={i[1]}
              name={TITLE}
              value={i[1]}
              label={i[0]}
              checked={value[i[1]]}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptSearchFormTitles;
