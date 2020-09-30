import React from 'react';

function SearchCryptFormTraits(props) {
  const traitsLeft = [
    ['1 intercept', '+1 intercept'],
    ['1 stealth', '+1 stealth'],
    ['1 bleed', '+1 bleed'],
    ['2 bleed', '+2 bleed'],
    ['1 strength', '+1 strength'],
    ['2 strength', '+2 strength'],
    ['additional strike', 'Additional Strike'],
    ['optional maneuver', 'Maneuver'],
    ['optional press', 'Press'],
  ];

  const traitsRight = [
    ['prevent', 'Prevent'],
    ['aggravated', 'Aggravated'],
    ['enter combat', 'Enter combat'],
    ['black hand', 'Black Hand'],
    ['seraph', 'Seraph'],
    ['infernal', 'Infernal'],
    ['red list', 'Red List'],
    ['flight', 'Flight'],
  ];

  const traitsLeftforms = traitsLeft.map((i, index) => {
    return (
      <div key={index} className="mr-2 custom-control custom-checkbox">
        <input
          id={i[0]}
          name="traits"
          className="mr-2 custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={i[0]} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  const traitsRightforms = traitsRight.map((i, index) => {
    return (
      <div key={index} className="mr-2 custom-control custom-checkbox">
        <input
          id={i[0]}
          name="traits"
          className="mr-2 custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChange(e)}
        />
        <label htmlFor={i[0]} className="mr-2 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <div className="pt-2">
      <h6>Traits:</h6>
      <div className="form-row">
        <div className="form-group col-7">{traitsLeftforms}</div>
        <div className="form-group col-5">{traitsRightforms}</div>
      </div>
    </div>
  );
}

export default SearchCryptFormTraits;
