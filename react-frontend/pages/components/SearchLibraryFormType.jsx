import React from 'react';
import Select from 'react-select';

function SearchLibraryFormType(props) {
  const types = [
    'ANY',
    'Action',
    'Action Modifier',
    'Ally',
    'Combat',
    'Conviction',
    'Equipment',
    'Event',
    'Master',
    'Political Action',
    'Power',
    'Reaction',
    'Reflex',
    'Retainer',
  ];

  const options = [];

  types.map((i, index) => {
    if (i == 'ANY') {
      options.push(
        {
          value: i.toLowerCase(),
          name: 'type',
          label:
          <>
            <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
            </span>
            {i}
          </>
        }
      );
    } else {
      const imgSrc = '/images/types/' + i.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';
      options.push(
        {
          value: i.toLowerCase(),
          name: 'type',
          label:
          <>
            <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
              <img src={imgSrc} className='discipline-base-image-results' />
            </span>
            {i}
          </>
        }
      );
    }
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Type:
        </label>
      </div>
      <div className='form-group col-9'>
        <Select
          options={options}
          isSearchable={false}
          name='type'
          value={options.find(obj => obj.value === props.value.toLowerCase())}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default SearchLibraryFormType;
