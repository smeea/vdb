import React from 'react';
import { Radio } from '@/components';
import { ID, ALL, OK, NOK } from '@/constants';

const InventoryShowSelect = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-0.5">
      {[
        [ALL, 'Show All'],
        [OK, 'Only Owned'],
        [NOK, 'Only Problems'],
      ].map((i) => (
        <Radio
          key={i[0]}
          id={i[0]}
          value={i[1]}
          checked={category == i[0]}
          onChange={(e) => setCategory(e.target[ID])}
        />
      ))}
    </div>
  );
};

export default InventoryShowSelect;
