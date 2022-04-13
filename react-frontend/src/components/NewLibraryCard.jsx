import React from 'react';
import AsyncSelect from 'react-select/async';
import { SelectLabelLibrary } from 'components';
import { useFilters } from 'hooks';
import { useApp } from 'context';

function NewLibraryCard(props) {
  const { libraryCardBase } = useApp();
  const { filterLibrary } = useFilters(libraryCardBase);

  const getOptionLabel = (option) => {
    return (
      <SelectLabelLibrary
        cardid={option.value}
        inInventory={props.inInventory}
      />
    );
  };

  const loadOptions = async (inputValue) => {
    if (inputValue.length > 2) {
      const input = { name: inputValue };

      const filteredCards = filterLibrary(input).map((card) => ({
        value: card.Id,
      }));

      return filteredCards;
    }
  };

  return (
    <AsyncSelect
      classNamePrefix="react-select"
      cacheOptions
      autoFocus={props.autoFocus}
      value={props.selectedValue}
      placeholder="Add Library Card"
      loadOptions={loadOptions}
      getOptionLabel={getOptionLabel}
      onChange={props.onChange}
    />
  );
}

export default NewLibraryCard;
