import React from 'react';
import { SelectAsync, SelectLabelLibrary } from '@/components';
import { useFilters } from '@/hooks';
import { useApp } from '@/context';

const NewLibraryCard = React.forwardRef(
  ({ inInventory, onChange, autoFocus }, ref) => {
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
        autoFocus={autoFocus}
        cacheOptions
        getOptionLabel={getOptionLabel}
        loadOptions={loadOptions}
        menuPlacement={isMobile ? 'top' : 'bottom'}
        onChange={onChange}
        placeholder="Add Library Card"
        ref={ref}
        value={null}
      />
    );
  }
);
NewLibraryCard.displayName = 'NewLibraryCard';

export default NewLibraryCard;
