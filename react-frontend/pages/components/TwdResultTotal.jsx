import React from 'react';
import AlertMessage from './AlertMessage.jsx';

function TwdResultTotal(props) {
  const byYear = {};
  let total = 0;

  props.decks.map((deck, index) => {
    const year = `'${deck['date'].slice(2,4)}`;
    if (byYear[year]) {
      byYear[year] += 1;
    } else {
      byYear[year] = 1;
    }
    total += 1;
  });

  const totalOutput = Object.keys(byYear).map((key, index) => {
    return (
      <span key={index} className="d-inline-block nobr pr-3">
        <span className="crypt-total">
          <b>{key}: </b>
        </span>
        {byYear[key]}
      </span>
    );
  });

  const value = (
    <>
      <div className="px-2 nobr">
        <b>TOTAL: {total}</b>
      </div>
      <div>{totalOutput}</div>
      <div />
    </>
  );

  return <AlertMessage className="info-message">{value}</AlertMessage>;
}
export default TwdResultTotal;
