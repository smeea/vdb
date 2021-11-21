import React from 'react';
import AsyncSelect from 'react-select/async';
import SelectLabelLibrary from './SelectLabelLibrary.jsx';

function NewLibraryCard(props) {
  const getOptionLabel = (option) => {
    return (
      <SelectLabelLibrary
        cardid={option.value}
        inInventory={props.inInventory}
      />
    );
  };

  const loadOptions = async (inputValue) => {
    const url = `${process.env.API_URL}search/library`;
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
