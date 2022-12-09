import React from 'react';
import { Checkbox } from 'components';

const CryptSearchFormTitles = ({ value, onChange }) => {
  return (
    <>
      <div className="ps-1 mx-0 flex flex-row py-1">
        <div className="flex px-0">
          <div className="text-blue font-bold">Title:</div>
        </div>
      </div>
      <div className="mx-0 flex flex-row">
        <div className="pe-0 inline basis-7/12">
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
        <div className="pe-0 inline basis-5/12">
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
    </>
  );
};

export default CryptSearchFormTitles;
