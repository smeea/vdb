import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { FormControl, InputGroup, Spinner, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import Check2 from '../../assets/images/icons/check2.svg';

function TwdSearchFormLocation({ value, setFormState }) {
  const handleChange = (value) => {
    setFormState((prevState) => ({
      ...prevState,
      location: value,
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
      /* cacheOptions */
      /* defaultOptions */
      /* autoFocus={false} */
      /* value={value} */
      placeholder="Location"
      loadOptions={loadOptions}
      onChange={handleChange}
      getOptionLabel={location => {return(location)}}
    />
  );
}

export default TwdSearchFormLocation;
