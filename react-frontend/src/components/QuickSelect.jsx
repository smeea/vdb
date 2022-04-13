import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { useApp } from 'context';
import { SelectLabelCrypt, SelectLabelLibrary } from 'components';
import { useFilters } from 'hooks';

const QuickSelect = ({ selectedCard, setCardId, inInventory }) => {
  const { isMobile, cryptCardBase, libraryCardBase } = useApp();
  const { filterCrypt } = useFilters(cryptCardBase);
  const { filterLibrary } = useFilters(libraryCardBase);

  const params = useParams();
  const handleChange = (option) => {
    setCardId(option.value);
  };
  const ref = useRef(null);

  const getOptionLabel = (option) => {
    const cardId = option.value;

    return (
      <>
        {cardId ? (
          cardId > 200000 ? (
            <SelectLabelCrypt cardid={cardId} inInventory={inInventory} />
          ) : (
            <SelectLabelLibrary cardid={cardId} inInventory={inInventory} />
          )
        ) : (
          <div className="gray">Enter Card Name</div>
        )}
      </>
    );
  };

  const loadOptions = async (inputValue) => {
    if (inputValue.length > 2) {
      const input = { name: inputValue };

      const filteredCryptCards = filterCrypt(input).map((card) => ({
        value: card.Id,
      }));
      const filteredLibCards = filterLibrary(input).map((card) => ({
        value: card.Id,
      }));

      return [...filteredCryptCards, ...filteredLibCards];
    }
  };

  useEffect(() => {
    if (isMobile && !params.id) ref.current.focus();
  }, []);

  const CardSelect = React.forwardRef((props, ref) => {
    return (
      <AsyncSelect
        classNamePrefix="react-select"
        cacheOptions
        autoFocus={!isMobile}
        loadOptions={loadOptions}
        value={{ value: selectedCard }}
        getOptionLabel={getOptionLabel}
        onChange={handleChange}
        ref={ref}
      />
    );
  });
  CardSelect.displayName = 'CardSelect';

  return <CardSelect ref={ref} />;
};

export default QuickSelect;
