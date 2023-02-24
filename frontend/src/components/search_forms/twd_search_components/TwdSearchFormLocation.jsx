import React from 'react';
import AsyncSelect from 'react-select/async';
import { useApp } from '@/context';

const TwdSearchFormLocation = ({ value, form }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const handleChange = (v) => {
    form.location = v.value ?? '';
  };

  const loadOptions = (inputValue) => {
    const url = `${import.meta.env.VITE_API_URL}/twd/locations`;
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
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          Location:
        </div>
      </div>
      <div className="w-3/4">
        <AsyncSelect
          cacheOptions
          menuPlacement="top"
          maxMenuHeight={maxMenuHeight}
          autoFocus={false}
          placeholder="Location"
          loadOptions={loadOptions}
          isClearable={true}
          value={
            value
              ? {
                  label: value,
                  value: value,
                }
              : null
          }
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TwdSearchFormLocation;
