import React, { useRef } from 'react';
import AsyncSelect from 'react-select/async';
import { useApp } from '@/context';
import { SelectLabelCrypt, SelectLabelLibrary } from '@/components';
import { useFilters } from '@/hooks';

const QuickSelect = ({ selectedCardid, inBadImport, setCard }) => {
  const { isMobile, cryptCardBase, libraryCardBase, playtest } = useApp();
  const { filterCrypt } = useFilters(cryptCardBase);
  const { filterLibrary } = useFilters(libraryCardBase);
  const ref = useRef();

  const handleChange = (event) => {
    setCard(
      event.value > 200000
        ? cryptCardBase[event.value]
        : libraryCardBase[event.value]
    );
  };

  const getOptionLabel = (option) => {
    const cardid = option.value;

    if (cardid > 200000) {
      return <SelectLabelCrypt cardid={cardid} />;
    } else if (cardid > 100000) {
      return <SelectLabelLibrary cardid={cardid} />;
    } else {
      return (
        <div className="text-midGray dark:text-midGrayDark">
          Enter Card Name
        </div>
      );
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

      return [...filteredCryptCards, ...filteredLibCards].sort(byTwd);
    }
  };

  return (
    <AsyncSelect
      autoFocus={!isMobile || !selectedCardid}
      menuPlacement={isMobile ? 'top' : 'bottom'}
      cacheOptions
      loadOptions={loadOptions}
      value={{ value: inBadImport ? selectedCardid : null }}
      getOptionLabel={getOptionLabel}
      onChange={handleChange}
      ref={ref}
    />
  );
};

export default QuickSelect;
