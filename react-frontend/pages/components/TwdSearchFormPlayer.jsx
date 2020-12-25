import React from 'react';
import AsyncSelect from 'react-select/async';

function TwdSearchFormPlayer({ value, setValue }) {
  const handleChange = (v) => {
    setValue((prevState) => ({
      ...prevState,
      player: v.value,
    }));
  };

  const loadOptions = (inputValue) => {
    const url = `${process.env.API_URL}twd/players`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    if (inputValue.length >= 2) {
      return fetch(url, options)
        .then((response) => response.json())
        .then((data) =>
          data.filter((value) =>
            value.label.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
    } else {
      return null;
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      autoFocus={false}
      placeholder="Player"
      loadOptions={loadOptions}
      onChange={handleChange}
    />
  );
}

export default TwdSearchFormPlayer;
