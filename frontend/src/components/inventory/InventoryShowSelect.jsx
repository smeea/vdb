import React from 'react';
import { Radio } from '@/components';

const InventoryShowSelect = ({ category, setCategory }) => {
  const options = [
    ['all', 'Show All'],
    ['ok', 'Only Owned'],
    ['nok', 'Only Problems'],
  ];

  return (
    <>
      {options.map((i) => (
        <Radio
          key={i[0]}
          id={i[0]}
          value={i[1]}
          checked={category == i[0]}
          onChange={(e) => setCategory(e.target.id)}
        />
      ))}
    </>
  );
};

export default InventoryShowSelect;
