import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';

function TwdSearchFormLocation({ value, setValue }) {
  const handleChange = (val) => {
    setValue((prevState) => ({
      ...prevState,
      location: val,
    }));
  }

  const loadOptions = (inputValue) => {
    const url = `${process.env.API_URL}twd/locations`;
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
      cacheOptions
      defaultOptions
      autoFocus={false}
      value={value}
      placeholder="Location"
      loadOptions={loadOptions}
      onChange={handleChange}
      getOptionLabel={location => {return(<div>{location}</div>)}}
    />
  );
}

export default TwdSearchFormLocation;
