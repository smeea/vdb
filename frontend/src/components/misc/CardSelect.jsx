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
    },
    ref
  ) => {
    const { isMobile, cryptCardBase, libraryCardBase, playtest } = useApp();
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

        const filteredCryptCards = filterCrypt(input)
          .filter((card) => playtest || card.Id < 210000)
          .map((card) => ({
            value: card.Id,
          }));

        const filteredLibCards = filterLibrary(input)
          .filter((card) => playtest || card.Id < 110000)
          .map((card) => ({
            value: card.Id,
          }));

        if (target === 'crypt') {
          return filteredCryptCards.sort(byTwd);
        } else if (target === 'library') {
          return filteredLibCards.sort(byTwd);
        }
        return [...filteredCryptCards, ...filteredLibCards].sort(byTwd);
      }
    };

    return (
      <SelectAsync
        autoFocus={autoFocus}
        cacheOptions
        getOptionLabel={getOptionLabel}
        loadOptions={loadOptions}
        menuPlacement={isMobile ? 'top' : 'bottom'}
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
