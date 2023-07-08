import React from 'react';
import { useApp } from '@/context';
import { CardSelect } from '@/components';

const QuickSelect = ({
  placeholder = 'Enter Card Name',
  selectedCardid,
  inBadImport,
  setCard,
}) => {
  const { isMobile, cryptCardBase, libraryCardBase } = useApp();

  const handleChange = (event) => {
    setCard(
      event.value > 200000
        ? cryptCardBase[event.value]
        : libraryCardBase[event.value],
    );
  };

  return (
    <CardSelect
      autoFocus={!isMobile || !selectedCardid}
      onChange={handleChange}
      placeholder={placeholder}
      value={inBadImport ? { value: selectedCardid } : null}
    />
  );
};

export default QuickSelect;
