import React from 'react';
import { SelectAsync } from '@/components';
import { useApp } from '@/context';

const TwdSearchFormLocation = ({ value, form }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const handleChange = (v) => {
    form.location = v.value ?? '';
  };

  const loadOptions = async (inputValue) => {
    const url = `${import.meta.env.VITE_API_URL}/twd/locations`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    if (inputValue.length >= 3) {
      const { default: unidecode } = await import('unidecode');

      return fetch(url, options)
        .then((response) => response.json())
        .then((data) =>
          data.filter((value) =>
            unidecode(value.label)
              .toLowerCase()
              .includes(unidecode(inputValue).toLowerCase())
          )
        );
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
        <SelectAsync
          cacheOptions
          menuPlacement="top"
          maxMenuHeight={maxMenuHeight}
          autoFocus={false}
          placeholder="Location"
          loadOptions={loadOptions}
          isClearable
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
