import React from 'react';

function ResultCryptGroup(props) {
  return (
    <span className="group pl-1">
      <b>
        <font color="a0a0a0">G</font>
        {props.value == 'ANY' ? 'X' : props.value}
      </b>
    </span>
  );
}

export default ResultCryptGroup;
