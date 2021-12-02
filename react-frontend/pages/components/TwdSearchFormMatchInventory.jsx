import React from 'react';
import Select from 'react-select';

function TwdSearchFormMatchInventory(props) {
  const matchOptions = [
    ['any', 'ANY'],
    ['0.7', '70%+'],
    ['0.8', '80%+'],
    ['0.9', '90%+'],
  ];

  const options = matchOptions.map((i, index) => {
    return {
      value: i[0],
      name: props.name,
      label: (
        <>
          <span className="me-4" />
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
      name={props.name}
      value={options.find((obj) => obj.value === props.value.toLowerCase())}
      onChange={props.onChange}
    />
  );
}

export default TwdSearchFormMatchInventory;
