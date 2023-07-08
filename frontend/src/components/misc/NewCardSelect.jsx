import React from 'react';
import { CardSelect } from '@/components';

const NewCardSelect = React.forwardRef(
  ({ target, inInventory, onChange, autoFocus }, ref) => {
    return (
      <CardSelect
        autoFocus={autoFocus}
        inInventory={inInventory}
        onChange={onChange}
        placeholder={`Add ${target === 'crypt' ? 'Crypt' : 'Library'} Card`}
        value={null}
        target={target}
        ref={ref}
      />
    );
  },
);
NewCardSelect.displayName = 'NewCardSelect';

export default NewCardSelect;
