import React from 'react';

function TwdSearchFormTraitMonoclan(props) {
  const trait = ['star', 'With Star Vampire'];

  return(
    <div className="mr-2 custom-control custom-checkbox">
      <input
        name="traits"
        id={`traits-${trait[0]}`}
        value={trait[0]}
        className="mr-2 custom-control-input"
        type="checkbox"
        checked={props.value[trait[0]]}
        onChange={(e) => props.onChange(e)}
      />
      <label htmlFor={`traits-${trait[0]}`} className="mr-2 custom-control-label">
        {trait[1]}
      </label>
    </div>
  );
}

export default TwdSearchFormTraitMonoclan;
