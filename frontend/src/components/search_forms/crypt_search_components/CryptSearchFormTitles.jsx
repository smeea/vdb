import React from 'react';
import { Form } from 'react-bootstrap';

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
    <Form.Check
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
    <Form.Check
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
      <div className="flex flex-row mx-0 py-1 ps-1">
        <div className="flex px-0">
          <div className="font-bold text-blue">Title:</div>
        </div>
      </div>
      <div className="flex flex-row mx-0">
        <div className="basis-7/12 inline pe-0">{titlesLeftforms}</div>
        <div className="basis-5/12 inline pe-0">{titlesRightforms}</div>
      </div>
    </>
  );
};

export default CryptSearchFormTitles;
