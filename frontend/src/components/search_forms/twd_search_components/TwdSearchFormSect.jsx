import React from 'react';
import Select from 'react-select';
import { useApp } from 'context';

const TwdSearchFormSect = ({ value, onChange }) => {
  const { isMobile, isXWide } = useApp();
  const name = 'sect';
  const maxMenuHeight = isXWide ? 500 : 350;

  const options = [
    'ANY',
    'Camarilla',
    'Sabbat',
    'Laibon',
    'Independent',
    'Anarch',
    'Imbued',
  ].map((i) => ({
    value: i.toLowerCase(),
    name: name,
    label: (
      <>
        <span className="margin-full" />
        {i}
      </>
    ),
  }));

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      isSearchable={!isMobile}
      name={name}
      maxMenuHeight={maxMenuHeight}
      value={options.find((obj) => obj.value === value.toLowerCase())}
      onChange={onChange}
    />
  );
};

export default TwdSearchFormSect;
