import React from 'react';
import AsyncSelect from 'react-select/async';
import { SelectLabelCrypt } from 'components';
import { useFilters } from 'hooks';
import { useApp } from 'context';

const NewCryptCard = ({
  inInventory,
  selectedValue,
  onChange,
  autoFocus,
  newRef,
}) => {
  const { cryptCardBase } = useApp();
  const { filterCrypt } = useFilters(cryptCardBase);

  const getOptionLabel = (option) => {
    return <SelectLabelCrypt cardid={option.value} inInventory={inInventory} />;
  };

  const loadOptions = async (inputValue) => {
    if (inputValue.length > 2) {
      const input = { name: inputValue };

      const filteredCards = filterCrypt(input).map((card) => ({
        value: card.Id,
      }));

      return filteredCards;
    }
  };

  return (
    <AsyncSelect
      ref={newRef}
      classNamePrefix="react-select"
      cacheOptions
      autoFocus={autoFocus}
      value={selectedValue}
      placeholder="Add Crypt Card"
      loadOptions={loadOptions}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
    />
  );
};

export default NewCryptCard;
