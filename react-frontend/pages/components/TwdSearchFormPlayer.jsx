import React, { useContext } from 'react';
import AsyncSelect from 'react-select/async';
import AppContext from '../../context/AppContext.js';

function TwdSearchFormPlayer(props) {
  const { isMobile } = useContext(AppContext);

  const handleChange = (v) => {
    props.setValue((prevState) => ({
      ...prevState,
      player: v ? v.value : '',
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
      classNamePrefix="react-select"
      cacheOptions
      menuPlacement="top"
      maxMenuHeight={isMobile ? window.screen.height - 250 : 500}
      autoFocus={false}
      placeholder="Player"
      loadOptions={loadOptions}
      isClearable={true}
      value={
        props.value
          ? {
              label: props.value,
              value: props.value,
            }
          : null
      }
      onChange={handleChange}
    />
  );
}

export default TwdSearchFormPlayer;
