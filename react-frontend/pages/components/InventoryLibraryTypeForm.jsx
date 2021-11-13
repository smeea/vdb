import React from 'react';
import ResultLibraryType from './ResultLibraryType.jsx';
import Select from 'react-select';

function InventoryLibraryTypeForm(props) {
  const options = [];

  props.cardtypes.map((i, index) => {
    options.push({
      value: i,
      label: (
        <div className="d-flex justify-content-between">
          {i === 'All' ? (
            <div className="ps-4">
              <div className="px-1">All</div>
            </div>
          ) : (
            <ResultLibraryType cardtype={i} total={0} />
          )}
          {props.byTypeTotal[i]} ({props.byTypeUnique[i]} uniq)
        </div>
      ),
    });
  });

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      placeholder="Select Card Type"
      value={options.find((obj) => obj.value === props.cardtype)}
      onChange={(e) => props.setCardtype(e.value)}
    />
  );
}

export default InventoryLibraryTypeForm;
