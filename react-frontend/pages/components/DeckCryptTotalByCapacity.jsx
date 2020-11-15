import React from 'react';

function DeckCryptTotalByCapacity(props) {
  let cryptTotalCap = 0;
  const capacityList = [];

  Object.keys(props.cards).map((key, index) => {
    cryptTotalCap += props.cards[key]['c']['Capacity'] * props.cards[key]['q'];
    [...Array(props.cards[key]['q'])].map((_, i) => {
      capacityList.push(props.cards[key]['c']['Capacity']);
    });
  });

  const cryptAvg =
    Math.round((cryptTotalCap / capacityList.length) * 100) / 100;

  let cryptMin = 0;
  let cryptMax = 0;
  capacityList.sort((a, b) => {
    return a - b;
  });

  [...Array(4)].map((_, i) => {
    cryptMin += capacityList.shift();
    cryptMax += capacityList.pop();
  });

  return (
    <>
      <div className="d-inline pr-2">Min={cryptMin}</div>
      <div className="d-inline px-2">Max={cryptMax}</div>
      <div className="d-inline pl-2">Avg={cryptAvg}</div>
    </>
  );
}

export default DeckCryptTotalByCapacity;
