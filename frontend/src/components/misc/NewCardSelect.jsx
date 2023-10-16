import React from 'react';
import { CardSelect } from '@/components';

const NewCardSelect = React.forwardRef(
  ({ target, inInventory, onChange, autoFocus, placement }, ref) => {
    return (
      <CardSelect
        autoFocus={autoFocus}
        inInventory={inInventory}
        onChange={onChange}
        placeholder={`Add ${target === 'crypt' ? 'Crypt' : 'Library'} Card`}
        placement={placement}
        value={null}
        target={target}
        ref={ref}
      />
    );
  }
);
NewCardSelect.displayName = 'NewCardSelect';

export default NewCardSelect;
