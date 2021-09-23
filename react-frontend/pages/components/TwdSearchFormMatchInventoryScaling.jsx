import React from 'react';

function TwdSearchFormMatchInventoryScaling(props) {
  return (
    <div className="me-2 custom-control custom-checkbox">
      <input
        name="scaling"
        id="scaling"
        value="scaling"
        className="me-2 custom-control-input"
        type="checkbox"
        checked={props.value}
        onChange={(e) => props.onChange(e)}
      />
      <label htmlFor="scaling" className="me-2 custom-control-label">
        Scale to 60 cards
      </label>
    </div>
  );
}

export default TwdSearchFormMatchInventoryScaling;
