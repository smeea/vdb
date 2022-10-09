import React from 'react';
import AsyncSelect from 'react-select/async';
import { SelectLabelLibrary } from 'components';
import { useFilters } from 'hooks';
import { useApp } from 'context';

const NewLibraryCard = ({
  inInventory,
  selectedValue,
  onChange,
  autoFocus,
  newRef,
}) => {
  const { libraryCardBase, playtest } = useApp();
  const { filterLibrary } = useFilters(libraryCardBase);

  const byTwd = (a, b) => {
    return libraryCardBase[b.value].Twd - libraryCardBase[a.value].Twd;
  };

  const getOptionLabel = (option) => {
    return (
      <SelectLabelLibrary cardid={option.value} inInventory={inInventory} />
    );
  };

  const loadOptions = async (inputValue) => {
    if (inputValue.length > 2) {
      const input = { name: inputValue };

      const filteredCards = filterLibrary(input)
        .filter((card) => playtest || card.Id < 110000)
        .map((card) => ({
          value: card.Id,
        }));

      return filteredCards.sort(byTwd);
    }
  };

  return (
    <AsyncSelect
      ref={newRef}
      classNamePrefix="react-select"
      cacheOptions
      autoFocus={autoFocus}
      value={selectedValue}
      placeholder="Add Library Card"
      loadOptions={loadOptions}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
    />
  );
};

export default NewLibraryCard;
