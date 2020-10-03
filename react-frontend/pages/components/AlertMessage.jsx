import React from 'react';

function AlertMessage(props) {
  const className =
    'd-flex align-items-center justify-content-between ' + props.className;
  return <div className={className}>{props.children}</div>;
}

export default AlertMessage;
