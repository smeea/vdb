import React from 'react';
import AsyncSelect from 'react-select/async';
import { SelectLabelCrypt } from 'components';

const NewCryptCard = ({
  inInventory,
  selectedValue,
  onChange,
  autoFocus,
  newRef,
}) => {
  const getOptionLabel = (option) => {
    return <SelectLabelCrypt cardid={option.value} inInventory={inInventory} />;
  };

  const loadOptions = async (inputValue) => {
    const url = `${process.env.API_URL}search/crypt`;
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
      return json.map((card) => ({
        value: card,
      }));
    } else {
      return null;
    }
  };

  return (
    <AsyncSelect
      ref={newRef}
      classNamePrefix="react-select"
      cacheOptions
      autoFocus={autoFocus}
      value={selectedValue}
      placeholder="Add Crypt Card"
      loadOptions={loadOptions}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
    />
  );
};

export default NewCryptCard;
