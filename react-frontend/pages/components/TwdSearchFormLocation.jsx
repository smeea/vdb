import React from 'react';
import AsyncSelect from 'react-select/async';

function TwdSearchFormLocation({ value, setValue }) {
  const handleChange = (v) => {
    setValue((prevState) => ({
      ...prevState,
      location: v.value,
    }));
  };

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
      classNamePrefix="react-select"
      cacheOptions
      menuPlacement="top"
      autoFocus={false}
      placeholder="Location"
      loadOptions={loadOptions}
      onChange={handleChange}
    />
  );
}

export default TwdSearchFormLocation;
