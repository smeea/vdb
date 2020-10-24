import React, { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

function SearchCryptFormGroup(props) {
  const groups = [1, 2, 3, 4, 5, 6];

  const GroupButtons = groups.map((i, index) => {
    return (
      <ToggleButton
        key={index}
        value={i}
        name="group"
        variant="outline-secondary"
        type="checkbox"
        checked={props.value[i]}
        onChange={(e) => props.onChange(e)}
      >
        {i}
      </ToggleButton>
    );
  });


  return (
    <div className="form-row">
      <div className="form-group col-3 d-flex align-items-center">
        <label className="h6 mb-0">Group:</label>
      </div>
      <div className="form-group col-9">
        <ButtonGroup toggle>
          {GroupButtons}
        </ButtonGroup>
      </div>
    </div>
  );
}

export default SearchCryptFormGroup;
