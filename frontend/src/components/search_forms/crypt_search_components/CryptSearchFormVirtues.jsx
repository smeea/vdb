import React from 'react';
import { ResultDisciplineImage } from 'components';
import virtuesList from 'assets/data/virtuesList.json';

  const CryptSearchFormVirtues = ({ value, onChange }) => {
  const virtuesforms = virtuesList.map((i, index) => {
    const virtueState = 'virtue-container state' + value[i];

    return (
      <div key={index} className={virtueState}>
        <label
          className="virtue-container d-flex justify-content-center align-items-center"
          htmlFor={i}
        >
          <input
            className="d-none"
            type="button"
            name="virtues"
            id={i}
            onClick={(e) => onChange(e)}
          />
          <ResultDisciplineImage className="virtue-image" value={i} />
        </label>
      </div>
    );
  });

  return <div className="input-group pb-2">{virtuesforms}</div>;
}

export default CryptSearchFormVirtues;
