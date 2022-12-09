import React from 'react';
import { ResultDisciplineImage } from 'components';
import virtuesList from 'assets/data/virtuesList.json';

const CryptSearchFormVirtues = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap input-group pb-2">
      {virtuesList.map((i, index) => (
        <div
          key={index}
          className={`discipline-container ${
            value[i] === 0 ? 'opacity-40' : ''
          }`}
          onClick={onChange}
        >
          <ResultDisciplineImage
            className="virtue-image"
            name="virtues"
            value={i}
          />
        </div>
      ))}
    </div>
  );
};

export default CryptSearchFormVirtues;
