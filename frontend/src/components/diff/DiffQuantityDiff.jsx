import React from 'react';
import ArrowDown from 'assets/images/icons/arrow-down.svg';
import ArrowUp from 'assets/images/icons/arrow-up.svg';
import Dash from 'assets/images/icons/dash.svg';

const DiffQuantityDiff = ({ qFrom, qTo }) => {
  if (qFrom == qTo) {
    return '';
  } else if (qFrom == 0) {
    return (
      <div className="red pb-1">
        <Dash viewBox="0 0 12 14" />
      </div>
    );
  } else if (qFrom < qTo) {
    return (
      <div className="red">
        <ArrowDown /> {qTo - qFrom}
      </div>
    );
  } else if (qFrom > qTo) {
    return (
      <div className="green">
        <ArrowUp /> {qFrom - qTo}
      </div>
    );
  }
};

export default DiffQuantityDiff;
