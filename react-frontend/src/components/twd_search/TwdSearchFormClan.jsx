import React from 'react';
import Select from 'react-select';
import { useApp } from 'context';
import ResultDisciplineImage from 'components';
import clansList from './forms_data/clansList.json';

function TwdSearchFormClan(props) {
  const { isMobile } = useApp();

  const clans = ['ANY', ...clansList];

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
              <ResultDisciplineImage value={i} />
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
      maxMenuHeight={isMobile ? window.screen.height - 250 : 500}
      value={options.find((obj) => obj.value === props.value.toLowerCase())}
      onChange={props.onChange}
    />
  );
}

export default TwdSearchFormClan;
