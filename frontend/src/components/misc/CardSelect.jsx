import React from 'react';
import { useApp } from '@/context';
import {
  SelectAsync,
  SelectLabelCrypt,
  SelectLabelLibrary,
} from '@/components';
import { useFilters } from '@/hooks';

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
    ref,
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
      if (inputValue.length > 2) {
        const input = { name: inputValue };

        const exactCryptMatches = [];
        const exactLibraryMatches = [];

        const filteredCryptCards = filterCrypt(input)
          .filter((card) => (playtestMode && !inInventory) || card.Id < 210000)
          .filter((card) => {
            if (card.Name.toLowerCase().startsWith(inputValue.toLowerCase())) {
              exactCryptMatches.push({ value: card.Id });
            } else {
              return true;
            }
          })
          .map((card) => ({
            value: card.Id,
          }));

        const filteredLibraryCards = filterLibrary(input)
          .filter((card) => (playtestMode && !inInventory) || card.Id < 110000)
          .filter((card) => {
            if (card.Name.toLowerCase().startsWith(inputValue.toLowerCase())) {
              exactLibraryMatches.push({ value: card.Id });
            } else {
              return true;
            }
          })
          .map((card) => ({
            value: card.Id,
          }));

        if (target === 'crypt') {
          return [
            ...exactCryptMatches.sort(byTwd),
            ...filteredCryptCards.sort(byTwd),
          ];
        } else if (target === 'library') {
          return [
            ...exactLibraryMatches.sort(byTwd),
            ...filteredLibraryCards.sort(byTwd),
          ];
        }
        return [
          ...[...exactCryptMatches, ...exactLibraryMatches].sort(byTwd),
          ...[...filteredCryptCards, ...filteredLibraryCards].sort(byTwd),
        ];
      }
    };

    return (
      <SelectAsync
        autoFocus={autoFocus}
        cacheOptions
        getOptionLabel={getOptionLabel}
        loadOptions={loadOptions}
        menuPlacement={placement ? placement : isMobile ? 'top' : 'bottom'}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        value={value}
      />
    );
  },
);
CardSelect.displayName = 'CardSelect';

export default CardSelect;
