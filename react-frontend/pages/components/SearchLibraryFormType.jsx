import React from 'react';
import Select from 'react-select';

function SearchLibraryFormType(props) {
  const types = [
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

  const typeOptions = [{
    value: 'ANY',
    name: 'type',
    label:
    <>
      <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
      </span>
      ANY
    </>
  }];

  types.map((cardtype, index) => {
    const imgSrc=process.env.ROOT_URL + 'images/types/' + cardtype.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';
    typeOptions.push({
      value: cardtype,
      name: 'type',
      label:
      <>
        <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
          <img src={imgSrc} className='discipline-base-image-results' />
        </span>
        {cardtype}
      </>
    });
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
          options={typeOptions}
          name='type'
          value={typeOptions.find(obj => obj.value === props.value)}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default SearchLibraryFormType;
