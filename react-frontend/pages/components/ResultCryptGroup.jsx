import React from 'react';

function ResultCryptGroup(props) {
  return (
    <span className="group">
      <b>
        <font color="a0a0a0">G</font>
        {props.value}
      </b>
    </span>
  );
}

export default ResultCryptGroup;
