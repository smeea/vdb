import React from 'react';
import { ResultDisciplineImage } from 'components';
import virtuesList from 'assets/data/virtuesList.json';

const CryptSearchFormVirtues = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap input-group pb-2">
      {virtuesList.map((i, index) => (
        <div key={index} className={`virtue-container state${value[i]}`}>
          <label
            className="virtue-container flex items-center justify-center"
            htmlFor={i}
          >
            <input
              className="hidden"
              type="button"
              name="virtues"
              id={i}
              onClick={onChange}
            />
            <ResultDisciplineImage className="virtue-image" value={i} />
          </label>
        </div>
      ))}
    </div>
  );
};

export default CryptSearchFormVirtues;
