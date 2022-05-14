import React, { useRef } from 'react';
import AsyncSelect from 'react-select/async';
import { useApp } from 'context';
import { SelectLabelCrypt, SelectLabelLibrary } from 'components';

const QuickSelect = ({ selectedCardid, inBadImport, setCard }) => {
  const { isMobile, cryptCardBase, libraryCardBase } = useApp();
  const ref = useRef(null);

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
      return <div className="gray">Enter Card Name</div>;
    }
  };

  const loadOptions = async (inputValue) => {
    const url = `${process.env.API_URL}search/quick`;
    const input = { name: inputValue };
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };

    if (inputValue.length > 2) {
      const response = await fetch(url, options);
      const json = await response.json();
      return json.map((c) => ({
        value: c,
      }));
    } else {
      return null;
    }
  };

  const CardSelect = React.forwardRef((props, ref) => {
    return (
      <AsyncSelect
        classNamePrefix="react-select"
        autoFocus={!isMobile || !selectedCardid}
        cacheOptions
        loadOptions={loadOptions}
        value={{ value: inBadImport ? selectedCardid : null }}
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
