import React from 'react';

function SearchLibraryFormTraits(props) {
  const traitsLeft = [
    ['intercept', '+Intercept / -Stealth'],
    ['stealth', '+Stealth / -Intercept'],
    ['bleed', '+Bleed'],
    ['strength', '+Strength'],
    ['dodge', 'Dodge'],
    ['optional maneuver', 'Maneuver'],
    ['additional strike', 'Additional Strike'],
    ['aggravated', 'Aggravated'],
    ['prevent', 'Prevent'],
  ];

  const traitsRight = [
    ['optional press', 'Press'],
    ['combat ends', 'Combat Ends'],
    ['enter combat', 'Enter combat'],
    ['bounce bleed', 'Bounce Bleed'],
    ['black hand', 'Black Hand'],
    ['seraph', 'Seraph'],
    ['anarch', 'Anarch'],
    ['infernal', 'Infernal'],
  ];

  const traitsLeftforms = traitsLeft.map( (i, index) => {
    return (
      <div key={index} className='mr-2 custom-control custom-checkbox'>
        <input id={i[0]} name='traits' className='mr-2 custom-control-input' type='checkbox' checked={props.value[i[0]]} onChange={e => props.onChange(e)} />
        <label htmlFor={i[0]} className='mr-2 custom-control-label'>
          {i[1]}
        </label>
      </div>
    );
  });

  const traitsRightforms = traitsRight.map( (i, index) => {
    return (
      <div key={index} className='mr-2 custom-control custom-checkbox'>
        <input id={i[0]} name='traits' className='mr-2 custom-control-input' type='checkbox' checked={props.value[i[0]]} onChange={e => props.onChange(e)} />
        <label htmlFor={i[0]} className='mr-2 custom-control-label'>
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <div className='pt-2'>
      <h6>Traits:</h6>
      <div className='form-row'>
        <div className='form-group col-7'>
          {traitsLeftforms}
        </div>
        <div className='form-group col-5'>
          {traitsRightforms}
        </div>
      </div>
    </div>
  );
}

export default SearchLibraryFormTraits;
