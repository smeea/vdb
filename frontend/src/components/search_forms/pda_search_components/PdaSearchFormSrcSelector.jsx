import React from 'react';

const PdaSearchFormSrcSelector = ({ value, onChange }) => {
  return (
    <>
      {[
        ['any', 'All'],
        ['favorites', 'Favorites'],
        ['my', 'My'],
      ].map((i, idx) => {
        return (
          <React.Fragment key={idx}>
            <input
              checked={value == i[0]}
              onChange={onChange}
              type="radio"
              id={i[0]}
              value={i[0]}
              name="src"
            />
            <label htmlFor={i[0]}>
              <div className="blue">
                <b>{i[1]}</b>
              </div>
            </label>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default PdaSearchFormSrcSelector;
