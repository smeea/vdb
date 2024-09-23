import React from 'react';
import Globe from '@/assets/images/icons/globe.svg?react';
import { ListEntry, Flag, Select } from '@/components';
import { useApp } from '@/context';
import { LANG, EN, ES, FR, PT } from '@/utils/constants';

const PlaytestReportLanguageSelector = () => {
  const { playtestProfile, updatePlaytestProfile } = useApp();

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

  const handleChange = (e) => updatePlaytestProfile(LANG, e.value);

  return (
    <ListEntry icon={<Globe />} title="Language" basis={3}>
      <Select
        options={options}
        value={options.find((obj) => obj.value === playtestProfile?.[LANG])}
        onChange={handleChange}
      />
    </ListEntry>
  );
};

export default PlaytestReportLanguageSelector;
