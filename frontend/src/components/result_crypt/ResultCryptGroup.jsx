import React from 'react';
import { ANY } from 'utils/constants';

function ResultCryptGroup(props) {
  return (
    <div className="group ">
      <b>
        <font color="a0a0a0">G</font>
        {props.value === ANY ? 'X' : props.value}
      </b>
    </div>
  );
}

export default ResultCryptGroup;
