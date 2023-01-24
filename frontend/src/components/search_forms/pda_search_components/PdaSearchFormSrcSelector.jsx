import React from 'react';
import { Radio } from '@/components';

const PdaSearchFormSrcSelector = ({ value, onChange }) => {
  return (
    <div className="flex space-x-8">
      {[
        ['any', 'All'],
        ['favorites', 'Favorites'],
        ['my', 'My'],
      ].map((i) => {
        return (
          <Radio
            key={i[0]}
            checked={value == i[0]}
            onChange={onChange}
            value={i[1]}
            name="src"
            id={i[0]}
          />
        );
      })}
    </div>
  );
};

export default PdaSearchFormSrcSelector;
