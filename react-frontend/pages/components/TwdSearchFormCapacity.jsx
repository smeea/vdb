import React from 'react';
import Select from 'react-select';

function TwdSearchFormCapacity(props) {
  const capacities = [
    ['any', 'ANY'],
    ['1,4', 'Low (Avg. < 4.0)'],
    ['4,7.5', 'Mid (Avg. 4.0 - 7.5)'],
    ['7.5,11', 'High (Avg. > 7.5)'],
  ];

  const options = [];

  capacities.map((i, index) => {
    options.push({
      value: i[0].toLowerCase(),
      name: 'capacity',
      label: (
        <>
          <span className="margin-full" />
          {i[1]}
        </>
      ),
    });
  });

  return (
    <Select
      options={options}
      isSearchable={false}
      name="capacity"
      value={options.find((obj) => obj.value === props.value.toLowerCase())}
      onChange={props.onChange}
    />
  );
}

export default TwdSearchFormCapacity;
