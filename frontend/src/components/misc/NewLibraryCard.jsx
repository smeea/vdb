import React from 'react';
import { SelectAsync, SelectLabelLibrary } from '@/components';
import { useFilters } from '@/hooks';
import { useApp } from '@/context';

const NewLibraryCard = ({ inInventory, onChange, autoFocus, ref }) => {
  const { isMobile, libraryCardBase, playtest } = useApp();
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
    <SelectAsync
      ref={ref}
      cacheOptions
      autoFocus={autoFocus}
      placeholder="Add Library Card"
      loadOptions={loadOptions}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      menuPlacement={isMobile ? 'top' : 'bottom'}
    />
  );
};

export default NewLibraryCard;
