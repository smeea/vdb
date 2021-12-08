import React from 'react';
import { ResultClanImage, ResultLibraryType } from 'components';
import Select from 'react-select';

function InventoryFilterForm(props) {
  const options = [];

  props.values.map((i, index) => {
    options.push({
      value: i,
      label: (
        <div className="d-flex justify-content-between">
          {props.target === 'crypt' && (
            <div className="pe-1">
              <span className="margin-full">
                {i !== 'All' && <ResultClanImage value={i} />}
              </span>
              <div className="d-inline ps-2">{i}</div>
            </div>
          )}
          {props.target === 'library' && (
            <div className="pe-1">
              {i === 'All' ? (
                <div className="px-1">All</div>
              ) : (
                <ResultLibraryType cardtype={i} total={0} />
              )}
            </div>
          )}
          <div className="nobr">
            {props.byTotal[i]} ({props.byUnique[i]} uniq)
          </div>
        </div>
      ),
    });
  });

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      placeholder="Select Filter"
      value={options.find((obj) => obj.value === props.value)}
      onChange={(e) => props.setValue(e.value)}
    />
  );
}

export default InventoryFilterForm;
