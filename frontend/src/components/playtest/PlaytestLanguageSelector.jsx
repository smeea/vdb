import React, { useState, useEffect } from 'react';
import Globe from '@/assets/images/icons/globe.svg?react';
import FlagEn from '@/assets/images/flags/en.svg?react';
import FlagEs from '@/assets/images/flags/es.svg?react';
import FlagFr from '@/assets/images/flags/fr.svg?react';
import FlagBr from '@/assets/images/flags/br.svg?react';
import { Select } from '@/components';
import { useFetch } from '@/hooks';
import { playtestServices } from '@/services';

const Flag = ({ value }) => {
  const languages = {
    'en-EN': FlagEn,
    'es-ES': FlagEs,
    'fr-FR': FlagFr,
    'pt-PT': FlagBr,
  };

  const SelectedFlag = languages[value];
  return (
    <div>
      <SelectedFlag width="18" height="18" viewBox="0 0 500 500" />
    </div>
  );
};

const PlaytestReportLanguageSelector = ({}) => {
  const [lang, setLang] = useState('en-EN');

  const url = `${import.meta.env.VITE_API_URL}/playtest/lang`;
  const { value: dataValue } = useFetch(url, {}, []);

  useEffect(() => {
    if (dataValue?.value) setLang(dataValue.value);
  }, [dataValue]);

  const languages = {
    'en-EN': 'English',
    'es-ES': 'Spanish',
    'fr-FR': 'French',
    'pt-PT': 'Portuguese',
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
    <div className="flex max-sm:flex-col sm:justify-between sm:items-center gap-2 sm:gap-4">
      <div className="flex items-center space-x-2 text-lg text-fgSecondary dark:text-fgSecondaryDark">
        <div className="flex min-w-[23px] justify-center">
          <Globe />
        </div>
        <div className="flex font-bold whitespace-nowrap">
          Playtest Language
        </div>
      </div>
      <div className="basis-full">
        <Select
          options={options}
          value={options.find((obj) => obj.value === lang)}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PlaytestReportLanguageSelector;
