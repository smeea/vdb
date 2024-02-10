import React from 'react';
import { useApp } from '@/context';
import {
  SelectAsync,
  SelectLabelCrypt,
  SelectLabelLibrary,
} from '@/components';
import { useFilters } from '@/hooks';

const getMatches = (
  inputValue,
  filterAction,
  playtestId,
  playtestMode,
  inInventory
) => {
  const input = { name: inputValue };

  const startingWith = [];
  const other = filterAction(input)
    .filter((card) => {
      if (!((playtestMode && !inInventory) || card.Id < playtestId)) {
        return false;
      }

      if (card.Name.toLowerCase().startsWith(inputValue.toLowerCase())) {
        startingWith.push({ value: card.Id });
      } else {
        return true;
      }
    })
    .map((card) => ({
      value: card.Id,
    }));

  return { startingWith, other };
};

const getAllMatches = (
  inputValue,
  filterCrypt,
  filterLibrary,
  target,
  playtestMode,
  inInventory
) => {
  const playtestId = target === 'crypt' ? 210000 : 110000;

  const cryptMatches =
    target !== 'library'
      ? getMatches(
          inputValue,
          filterCrypt,
          playtestId,
          playtestMode,
          inInventory
        )
      : [];

  const libraryMatches =
    target !== 'crypt'
      ? getMatches(
          inputValue,
          filterLibrary,
          playtestId,
          playtestMode,
          inInventory
        )
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
      placement,
    },
    ref
  ) => {
    const { isMobile, cryptCardBase, libraryCardBase, playtestMode } = useApp();
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
      const aInTwd =
        a.value > 200000
          ? cryptCardBase[a.value].Twd
          : libraryCardBase[a.value].Twd;
      const bInTwd =
        b.value > 200000
          ? cryptCardBase[b.value].Twd
          : libraryCardBase[b.value].Twd;

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
          inInventory
        );

        if (target === 'crypt') {
          return [
            ...cryptMatches.startingWith.sort(byTwd),
            ...cryptMatches.other.sort(byTwd),
          ];
        } else if (target === 'library') {
          return [
            ...libraryMatches.startingWith.sort(byTwd),
            ...libraryMatches.other.sort(byTwd),
          ];
        }
        return [
          ...[
            ...cryptMatches.startingWith,
            ...libraryMatches.startingWith,
          ].sort(byTwd),
          ...[...cryptMatches.other, ...libraryMatches.other].sort(byTwd),
        ];
      }
    };

    return (
      <SelectAsync
        autoFocus={autoFocus}
        getOptionLabel={getOptionLabel}
        loadOptions={loadOptions}
        menuPlacement={placement ? placement : isMobile ? 'top' : 'bottom'}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        value={value}
      />
    );
  }
);
CardSelect.displayName = 'CardSelect';

export default CardSelect;
