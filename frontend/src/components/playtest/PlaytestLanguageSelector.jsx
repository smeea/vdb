import React from 'react';
import Globe from '@icons/globe.svg?react';
import { ConditionalTooltipOrModal, ListEntry, Flag, Select } from '@/components';
import { useApp } from '@/context';
import { LANG, EN, ES, FR, PT } from '@/constants';

const PlaytestReportLanguageSelector = () => {
  const { isMobile, playtestProfile, updatePlaytestProfile } = useApp();

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
    <ListEntry
      icon={<Globe />}
      title={
        <div className="flex gap-2">
          Language
          <ConditionalTooltipOrModal
            title="Playtest Language"
            overlay={
              <div className="flex flex-col gap-1">
                <div>
                  Language of playtest reports (only affects which of the coordinators will receive
                  it)
                </div>
                <div>Independent from selected language of card text</div>
              </div>
            }
          >
            <div className="text-fgThird dark:text-fgThirdDark">[?]</div>
          </ConditionalTooltipOrModal>
        </div>
      }
      basis={isMobile ? 2 : 3}
      forceOneLine
    >
      <Select
        className="w-full"
        options={options}
        value={options.find((obj) => obj.value === playtestProfile?.[LANG])}
        onChange={handleChange}
      />
    </ListEntry>
  );
};

export default PlaytestReportLanguageSelector;
