import React from 'react';
import { useApp } from '@/context';
import { Select, SelectLabelCrypt, SelectLabelLibrary } from '@/components';
import { useFilters } from '@/hooks';
import { CRYPT, LIBRARY } from '@/constants';

const getMatches = (inputValue, filterAction, playtestId, playtestMode, inInventory) => {
  const input = { name: inputValue };

  const startingWith = [];
  const other = filterAction(input)
    .filter((card) => {
      if (!((playtestMode && !inInventory) || card[ID] < playtestId)) {
        return false;
      }

      if (card[NAME].toLowerCase().startsWith(inputValue.toLowerCase())) {
        startingWith.push({ value: card[ID] });
      } else {
        return true;
      }
    })
    .map((card) => ({
      value: card[ID],
    }));

  return { startingWith, other };
};

const getAllMatches = (
  inputValue,
  filterCrypt,
  filterLibrary,
  target,
  playtestMode,
  inInventory,
) => {
  const cryptPlaytestId = 210000;
  const libraryPlaytestId = 110000;

  const cryptMatches =
    target !== LIBRARY
      ? getMatches(inputValue, filterCrypt, cryptPlaytestId, playtestMode, inInventory)
      : [];

  const libraryMatches =
    target !== CRYPT
      ? getMatches(inputValue, filterLibrary, libraryPlaytestId, playtestMode, inInventory)
      : [];

  return {
    cryptMatches,
    libraryMatches,
  };
};

const CardSelect = React.forwardRef(
  (
    {
      target,
      value,
      inInventory,
      placeholder = 'Enter Card Name',
      autoFocus,
      onChange,
      menuPlacement,
    },
    ref,
  ) => {
    const { cryptCardBase, libraryCardBase, playtestMode } = useApp();
    const { filterCrypt } = useFilters(cryptCardBase);
    const { filterLibrary } = useFilters(libraryCardBase);

    const getOptionLabel = (option) => {
      const cardid = option.value;

      if (cardid > 200000) {
        return <SelectLabelCrypt cardid={cardid} inInventory={inInventory} />;
      } else if (cardid > 100000) {
        return <SelectLabelLibrary cardid={cardid} inInventory={inInventory} />;
      }
    };

    const byTwd = (a, b) => {
      const aInTwd = a.value > 200000 ? cryptCardBase[a.value][TWD] : libraryCardBase[a.value][TWD];
      const bInTwd = b.value > 200000 ? cryptCardBase[b.value][TWD] : libraryCardBase[b.value][TWD];

      return bInTwd - aInTwd;
    };

    const loadOptions = async (inputValue) => {
      if (
        (inputValue.length > 2 && !inputValue.startsWith('the')) ||
        (inputValue.length > 3 && !inputValue.startsWith('the ')) ||
        inputValue.length > 4
      ) {
        const { cryptMatches, libraryMatches } = getAllMatches(
          inputValue,
          filterCrypt,
          filterLibrary,
          target,
          playtestMode,
          inInventory,
        );

        if (target === CRYPT) {
          return [
            ...cryptMatches.startingWith.toSorted(byTwd),
            ...cryptMatches.other.toSorted(byTwd),
          ];
        } else if (target === LIBRARY) {
          return [
            ...libraryMatches.startingWith.toSorted(byTwd),
            ...libraryMatches.other.toSorted(byTwd),
          ];
        }
        return [
          ...[...cryptMatches.startingWith, ...libraryMatches.startingWith].toSorted(byTwd),
          ...[...cryptMatches.other, ...libraryMatches.other].toSorted(byTwd),
        ];
      }
    };

    return (
      <Select
        variant="async"
        autoFocus={autoFocus}
        getOptionLabel={getOptionLabel}
        loadOptions={loadOptions}
        onChange={onChange}
        menuPlacement={menuPlacement}
        placeholder={placeholder}
        ref={ref}
        value={value}
      />
    );
  },
);
CardSelect.displayName = 'CardSelect';

export default CardSelect;
