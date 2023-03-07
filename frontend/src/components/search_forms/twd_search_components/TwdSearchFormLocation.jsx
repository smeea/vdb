import React from 'react';
import { SelectAsync } from '@/components';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';

const TwdSearchFormLocation = ({ value, form }) => {
  const { isXWide } = useApp();
  const urlCountries = `${import.meta.env.VITE_API_URL}/twd/countries`;
  const urlCities = `${import.meta.env.VITE_API_URL}/twd/cities`;
  const { value: countries } = useFetch(urlCountries, {}, []);
  const { value: cities } = useFetch(urlCities, {}, []);
  const maxMenuHeight = isXWide ? 500 : 350;

  const handleChange = (v, target) => {
    form.location[target] = v.value ?? '';
    if (target === 'country') {
      form.location.city = '';
    } else if (!v.value.includes(value.country)) {
      form.location.country = '';
    }
  };

  const loadOptions = async (inputValue, target) => {
    if (inputValue.length >= 2) {
      const { default: unidecode } = await import('unidecode');
      const data = target === 'cities' ? cities : countries;

      return data
        .filter((v) => {
          if (target === 'cities' && !v.includes(value.country)) {
            return false;
          }
          return unidecode(v.replace(/,.*$/, ''))
            .toLowerCase()
            .includes(unidecode(inputValue).toLowerCase());
        })
        .map((v) => {
          return {
            label: v,
            value: v,
          };
        });
    }
  };

  const loadOptionsCountry = (inputValue) => {
    return loadOptions(inputValue, 'countries');
  };

  const loadOptionsCity = (inputValue) => {
    return loadOptions(inputValue, 'cities');
  };

  return (
    <div className="flex flex-col gap-1.5">
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
            placeholder="Country"
            loadOptions={loadOptionsCountry}
            isClearable
            value={
              value.country
                ? {
                    label: value.country,
                    value: value.country,
                  }
                : null
            }
            onChange={(e) => handleChange(e, 'country')}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-1/4" />
        <div className="w-3/4">
          <SelectAsync
            cacheOptions
            menuPlacement="top"
            maxMenuHeight={maxMenuHeight}
            autoFocus={false}
            placeholder="City"
            loadOptions={loadOptionsCity}
            isClearable
            value={
              value.city
                ? {
                    label: value.city,
                    value: value.city,
                  }
                : null
            }
            onChange={(e) => handleChange(e, 'city')}
          />
        </div>
      </div>
    </div>
  );
};

export default TwdSearchFormLocation;
