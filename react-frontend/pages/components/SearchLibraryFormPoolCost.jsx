import React from 'react';
import Select from 'react-select';

function SearchLibraryFormPoolCost(props) {
  const pool = ['ANY', '0', '1', '2', '3', '4', '5', '6'];
  const options = [];
  pool.map((i, index) => {
    if (i == 'ANY') {
      options.push({
        value: i.toLowerCase(),
        name: 'pool',
        label: (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '40px',
                textAlign: 'center',
              }}
            ></span>
            {i}
          </>
        ),
      });
    } else {
      options.push({
        value: i,
        name: 'pool',
        label: (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '40px',
                textAlign: 'center',
              }}
            ></span>
            {i}
          </>
        ),
      });
    }
  });

  const moreless = [
    ['le', '<='],
    ['eq', '=='],
    ['ge', '>='],
  ];
  const morelessOptions = [];

  moreless.map((i, index) => {
    morelessOptions.push({
      value: i[0],
      name: 'poolmoreless',
      label: (
        <>
          <span
            style={{
              display: 'inline-block',
              width: '40px',
              textAlign: 'center',
            }}
          ></span>
          {i[1]}
        </>
      ),
    });
  });

  return (
    <div className="form-row">
      <div className="form-group col-3 d-flex align-items-center">
        <label className="h6 mb-0">Pool Cost:</label>
      </div>
      <div className="form-group col-9">
        <Select
          options={morelessOptions}
          isSearchable={false}
          name="poolmoreless"
          value={morelessOptions.find((obj) => obj.value === props.moreless)}
          onChange={props.onChange}
        />
        <Select
          options={options}
          isSearchable={false}
          name="pool"
          value={options.find((obj) => obj.value === props.value)}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default SearchLibraryFormPoolCost;
