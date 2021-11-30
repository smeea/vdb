import React from 'react';

function ResultCryptGroup(props) {
  return (
    <div className="group px-1">
      <b>
        <font color="a0a0a0">G</font>
        {props.value == 'ANY' ? 'X' : props.value}
      </b>
    </div>
  );
}

export default ResultCryptGroup;
