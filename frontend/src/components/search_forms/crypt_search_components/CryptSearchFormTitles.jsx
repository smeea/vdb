import React from 'react';

const CryptSearchFormTitles = ({ value, onChange }) => {
  const titlesLeftforms = [
    ['primogen', 'Primogen'],
    ['prince', 'Prince'],
    ['justicar', 'Justicar'],
    ['inner circle', 'Inner Circle'],
    ['baron', 'Baron'],
    ['1 vote', '1 vote (titled)'],
    ['2 votes', '2 votes (titled)'],
  ].map((i, index) => (
    <input
      key={index}
      name="titles"
      value={i[0]}
      type="checkbox"
      id={`title-${i[0]}`}
      label={i[1]}
      checked={value[i[0]]}
      onChange={onChange}
    />
  ));

  const titlesRightforms = [
    ['bishop', 'Bishop'],
    ['archbishop', 'Archbishop'],
    ['priscus', 'Priscus'],
    ['cardinal', 'Cardinal'],
    ['regent', 'Regent'],
    ['magaji', 'Magaji'],
    ['none', 'Non-titled'],
  ].map((i, index) => (
    <input
      key={index}
      name="titles"
      value={i[0]}
      type="checkbox"
      id={`title-${i[0]}`}
      label={i[1]}
      checked={value[i[0]]}
      onChange={onChange}
    />
  ));

  return (
    <>
      <div className="ps-1 mx-0 flex flex-row py-1">
        <div className="flex px-0">
          <div className="text-blue font-bold">Title:</div>
        </div>
      </div>
      <div className="mx-0 flex flex-row">
        <div className="pe-0 inline basis-7/12">{titlesLeftforms}</div>
        <div className="pe-0 inline basis-5/12">{titlesRightforms}</div>
      </div>
    </>
  );
};

export default CryptSearchFormTitles;
