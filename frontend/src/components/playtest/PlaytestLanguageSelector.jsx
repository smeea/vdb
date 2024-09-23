import React, { useState, useEffect } from 'react';
import Globe from '@/assets/images/icons/globe.svg?react';
import { ListEntry, Flag, Select } from '@/components';
import { useFetch } from '@/hooks';
import { playtestServices } from '@/services';
import { EN, ES, FR, PT } from '@/utils/constants';

const PlaytestReportLanguageSelector = () => {
  const [lang, setLang] = useState();
  const url = `${import.meta.env.VITE_API_URL}/playtest/lang`;
  const { value } = useFetch(url, {}, []);

  useEffect(() => {
    if (value?.value) setLang(value.value);
  }, [value]);

  const languages = {
    [EN]: 'English',
    [ES]: 'Spanish',
    [FR]: 'French',
    [PT]: 'Portuguese',
  };

  const options = Object.keys(languages).map((i) => {
    return {
      value: i,
      name: languages[i],
      label: (
        <div className="flex items-center">
          <div className="flex w-[40px] justify-center">
            <Flag value={i} />
          </div>
          {languages[i]}
        </div>
      ),
    };
  });

  const handleChange = (e) => {
    setLang(e.value);
    playtestServices.changeLang(e.value);
  };

  return (
    <ListEntry icon={<Globe />} title="Language">
      <Select
        options={options}
        value={options.find((obj) => obj.value === lang)}
        onChange={handleChange}
      />
    </ListEntry>
  );
};

export default PlaytestReportLanguageSelector;
