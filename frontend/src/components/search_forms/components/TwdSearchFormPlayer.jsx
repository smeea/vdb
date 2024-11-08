import React from 'react';
import { Select } from '@/components';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';
import { AUTHOR } from '@/constants';

const TwdSearchFormPlayer = ({ inPda, value, form }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const url = `${import.meta.env.VITE_API_URL}/${inPda ? 'pda' : 'twd'}/authors`;
  const { value: players } = useFetch(url, {}, []);

  const handleChange = (v) => {
    form[AUTHOR] = v?.value ?? '';
  };

  const loadOptions = async (inputValue) => {
    if (inputValue.length >= 3) {
      const { default: unidecode } = await import('unidecode');

      return players
        .filter((v) => unidecode(v).toLowerCase().includes(unidecode(inputValue).toLowerCase()))
        .map((v) => {
          return {
            label: v,
            value: v,
          };
        });
    }
  };

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          {inPda ? 'Author' : 'Winner'}:
        </div>
      </div>
      <div className="w-3/4">
        <Select
          variant="async"
          cacheOptions
          maxMenuHeight={maxMenuHeight}
          autoFocus={false}
          placeholder="Name"
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

export default TwdSearchFormPlayer;
