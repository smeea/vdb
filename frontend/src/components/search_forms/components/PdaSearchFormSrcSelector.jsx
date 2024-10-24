import React from 'react';
import { Radio } from '@/components';

const PdaSearchFormSrcSelector = ({ value, onChange }) => {
  return (
    <div className="flex gap-4 sm:gap-6">
      {[
        ['any', 'All'],
        ['favorites', 'Favorites'],
        ['my', 'My'],
        ['my-nonpublic', 'My Non-Public'],
      ].map((i) => (
        <Radio
          key={i[0]}
          checked={value == i[0]}
          onChange={onChange}
          value={i[1]}
          name="src"
          id={i[0]}
        />
      ))}
    </div>
  );
};

export default PdaSearchFormSrcSelector;
