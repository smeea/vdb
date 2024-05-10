import React from 'react';
import { Checkbox } from '@/components';

const CryptSearchFormTitles = ({ value, onChange }) => {
  return (
    <div className="space-y-1">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Title:</div>
      <div className="flex">
        <div className="w-7/12 space-y-0.5">
          {[
            ['primogen', 'Primogen'],
            ['prince', 'Prince'],
            ['justicar', 'Justicar'],
            ['inner circle', 'Inner Circle'],
            ['baron', 'Baron'],
            ['1 vote', '1 vote (titled)'],
            ['2 votes', '2 votes (titled)'],
          ].map((i, index) => (
            <Checkbox
              key={index}
              name="titles"
              value={i[0]}
              label={i[1]}
              checked={value[i[0]]}
              onChange={onChange}
            />
          ))}
        </div>
        <div className="w-5/12 space-y-0.5">
          {[
            ['bishop', 'Bishop'],
            ['archbishop', 'Archbishop'],
            ['priscus', 'Priscus'],
            ['cardinal', 'Cardinal'],
            ['regent', 'Regent'],
            ['magaji', 'Magaji'],
            ['none', 'Non-titled'],
          ].map((i, index) => (
            <Checkbox
              key={index}
              name="titles"
              value={i[0]}
              label={i[1]}
              checked={value[i[0]]}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptSearchFormTitles;
