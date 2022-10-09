import React from 'react';
import Select from 'react-select';
import { ResultClanImage } from 'components';
import imbuedClansList from 'assets/data/imbuedClansList.json';
import vampireClansList from 'assets/data/vampireClansList.json';
import { useApp } from 'context';

const TwdSearchFormClan = ({ value, onChange }) => {
  const { isMobile, isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const clans = ['ANY', ...vampireClansList, ...imbuedClansList];

  const options = [];

  clans.map((i, index) => {
    if (i == 'ANY' || i == 'NONE') {
      options.push({
        value: i.toLowerCase(),
        name: 'clan',
        label: (
          <>
            <span className="margin-full" />
            {i}
          </>
        ),
      });
    } else {
      options.push({
        value: i.toLowerCase(),
        name: 'clan',
        label: (
          <>
            <span className="margin-full">
              <ResultClanImage value={i} />
            </span>
            {i}
          </>
        ),
      });
    }
  });

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      isSearchable={!isMobile}
      name="clan"
      maxMenuHeight={maxMenuHeight}
      value={options.find((obj) => obj.value === value.toLowerCase())}
      onChange={onChange}
    />
  );
};

export default TwdSearchFormClan;
