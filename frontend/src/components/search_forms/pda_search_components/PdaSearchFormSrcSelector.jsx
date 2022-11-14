import React from 'react';
import { Form } from 'react-bootstrap';

const PdaSearchFormSrcSelector = ({ value, onChange }) => {
  return (
    <>
      {[
        ['any', 'All'],
        ['favorites', 'Favorites'],
        ['my', 'My'],
      ].map((i, idx) => {
        return (
          <Form.Check
            key={idx}
            checked={value == i[0]}
            onChange={onChange}
            type="radio"
            id={i[0]}
            value={i[0]}
            name="src"
            label={
              <div className="blue">
                <b>{i[1]}</b>
              </div>
            }
            inline
          />
        );
      })}
    </>
  );
};

export default PdaSearchFormSrcSelector;
