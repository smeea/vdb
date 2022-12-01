import React from 'react';
import Select from 'react-select';

const TwdSearchFormMatchInventory = ({ value, target, onChange }) => {
  const name = 'matchInventory';

  const options = [
    ['any', 'ANY'],
    ['0.7', '70%+'],
    ['0.8', '80%+'],
    ['0.9', '90%+'],
  ].map((i) => ({
    value: i[0],
    name: target,
    label: (
      <>
        <span className="me-3" />
        {i[1]}
      </>
    ),
  }));

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      isSearchable={false}
      name={name}
      value={options.find((obj) => obj.value === value.toLowerCase())}
      onChange={onChange}
    />
  );
};

export default TwdSearchFormMatchInventory;
