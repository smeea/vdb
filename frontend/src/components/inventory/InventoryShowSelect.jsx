import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { Radio } from '@/components';
import { ALL, OK, NOK } from '@/constants';

const InventoryShowSelect = ({ category, setCategory }) => {
  return (
    <RadioGroup
      value={category}
      onChange={setCategory}
      aria-label="Server size"
      className="flex flex-col gap-0.5"
    >
      {[
        [ALL, 'Show All'],
        [OK, 'Only Owned'],
        [NOK, 'Only Problems'],
      ].map((i) => (
        <Radio key={i[0]} value={i[0]} label={i[1]} />
      ))}
    </RadioGroup>
  );
};

export default InventoryShowSelect;
