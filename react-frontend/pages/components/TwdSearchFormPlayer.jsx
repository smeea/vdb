import React from 'react';
import AsyncSelect from 'react-select/async';

function TwdSearchFormPlayer({ value, setValue }) {
  const handleChange = (value) => {
    setValue((prevState) => ({
      ...prevState,
      player: value,
    }));
  }

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
        .then(data => {
          return data.filter(value => value.toLowerCase().includes(inputValue.toLowerCase()) || !inputValue.length)
        });
    } else {
      return null;
    }
  };

  return (
    <AsyncSelect
      /* cacheOptions */
      /* defaultOptions */
      /* autoFocus={false} */
      /* value={value} */
      placeholder="Player"
      loadOptions={loadOptions}
      onChange={handleChange}
      getOptionLabel={player => {return(player)}}
    />
  );
}

export default TwdSearchFormPlayer;
