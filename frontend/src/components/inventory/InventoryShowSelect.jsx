import React from 'react';
import { Radio } from 'components';

const InventoryShowSelect = ({ category, setCategory }) => {
  return (
    <>
      <Radio
        id="all"
        value="Show All"
        checked={category == 'all'}
        onChange={(e) => setCategory(e.target.id)}
      />
      <Radio
        id="ok"
        value="Only Owned"
        checked={category == 'ok'}
        onChange={(e) => setCategory(e.target.id)}
      />
      <Radio
        id="nok"
        value="Only Problems"
        checked={category == 'nok'}
        onChange={(e) => setCategory(e.target.id)}
      />
    </>
  );
};

export default InventoryShowSelect;
