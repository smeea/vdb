import React from 'react';
import { CardSelect } from '@/components';
import { CRYPT } from '@/utils/constants';

const NewCardSelect = React.forwardRef(
  ({ target, inInventory, onChange, autoFocus, menuPlacement }, ref) => {
    return (
      <CardSelect
        autoFocus={autoFocus}
        inInventory={inInventory}
        onChange={onChange}
        placeholder={`Add ${target === CRYPT ? 'Crypt' : 'Library'} Card`}
        menuPlacement={menuPlacement}
        value={null}
        target={target}
        ref={ref}
      />
    );
  },
);
NewCardSelect.displayName = 'NewCardSelect';

export default NewCardSelect;
