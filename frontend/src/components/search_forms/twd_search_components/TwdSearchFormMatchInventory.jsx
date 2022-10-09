import React from 'react';
import Select from 'react-select';

const TwdSearchFormMatchInventory = ({ value, name, onChange }) => {
  const matchOptions = [
    ['any', 'ANY'],
    ['0.7', '70%+'],
    ['0.8', '80%+'],
    ['0.9', '90%+'],
  ];

  const options = matchOptions.map((i) => {
    return {
      value: i[0],
      name: name,
      label: (
        <>
          <span className="me-3" />
          {i[1]}
        </>
      ),
    };
  });

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
