import React from 'react';
import Select from 'react-select';
import { ResultClanImage } from 'components';
import imbuedClansList from 'assets/data/imbuedClansList.json';
import vampireClansList from 'assets/data/vampireClansList.json';
import { useApp } from 'context';

const TwdSearchFormClan = ({ value, onChange }) => {
  const { isMobile, isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const options = ['ANY', ...vampireClansList, ...imbuedClansList].map((i) => {
    if (i == 'ANY' || i == 'NONE') {
      return {
        value: i.toLowerCase(),
        name: 'clan',
        label: (
          <div className="d-flex align-items-center">
            <div className="d-flex w-[40px]" />
            {i}
          </div>
        ),
      };
    } else {
      return {
        value: i.toLowerCase(),
        name: 'clan',
        label: (
          <div className="d-flex align-items-center">
            <div className="d-flex w-[40px]">
              <ResultClanImage value={i} />
            </div>
            {i}
          </div>
        ),
      };
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
