import React from 'react';
import { Select } from '@/components';
import { ResultClanImage } from '@/components';
import imbuedClansList from '@/assets/data/imbuedClansList.json';
import vampireClansList from '@/assets/data/vampireClansList.json';
import { useApp } from '@/context';

const TwdSearchFormClan = ({ value, onChange }) => {
  const { playtest, isMobile, isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const options = ['ANY', ...vampireClansList, ...imbuedClansList]
    .filter((clan) => playtest || clan !== 'Hecata')
    .map((i) => {
      if (i == 'ANY' || i == 'NONE') {
        return {
          value: i.toLowerCase(),
          name: 'clan',
          label: (
            <div className="flex items-center">
              <div className="flex w-[40px]" />
              {i}
            </div>
          ),
        };
      } else {
        return {
          value: i.toLowerCase(),
          name: 'clan',
          label: (
            <div className="flex items-center">
              <div className="flex w-[40px]">
                <ResultClanImage value={i} />
              </div>
              {i}
            </div>
          ),
        };
      }
    });

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          Clan:
        </div>
      </div>
      <div className="w-3/4">
        <Select
          options={options}
          isSearchable={!isMobile}
          name="clan"
          maxMenuHeight={maxMenuHeight}
          value={options.find((obj) => obj.value === value.toLowerCase())}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TwdSearchFormClan;
