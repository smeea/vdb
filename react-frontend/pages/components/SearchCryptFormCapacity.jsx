import React from 'react';
import Select from 'react-select';

function SearchCryptFormCapacity(props) {
  const capacity = [
    'ANY',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ];
  const options = [];

  capacity.map((i, index) => {
    let v;
    i == 'ANY' ? v = i.toLowerCase() : v = i;

    options.push({
      value: v,
      name: 'capacity',
      label: (
        <>
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              textAlign: 'center',
            }}
          ></span>
          {i}
        </>
      ),
    });
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
      name: 'capacitymoreless',
      label: (
        <>
          <span
            style={{
              display: 'inline-block',
              width: '20px',
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
        <label className="h6 mb-0">Capacity:</label>
      </div>
      <div className="form-group col-9">
        <div className="row">
          <div className="col-6 pr-0">
            <Select
              options={morelessOptions}
              isSearchable={false}
              name="capacitymoreless"
              value={morelessOptions.find((obj) => obj.value === props.moreless)}
              onChange={props.onChange}
            />
          </div>
          <div className="col-6 pl-0">
            <Select
              options={options}
              isSearchable={false}
              name="capacity"
              value={options.find((obj) => obj.value === props.value)}
              onChange={props.onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCryptFormCapacity;
