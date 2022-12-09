import React from 'react';
import { ResultDisciplineImage } from 'components';
import disciplinesList from 'assets/data/disciplinesList.json';

const CryptSearchFormDisciplines = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap input-group justify-start py-1">
      {disciplinesList.map((i, index) => (
        <div
          key={index}
          className={`flex items-center justify-center discipline-container ${
            value[i] === 0 ? 'opacity-40' : ''
          }`}
          onClick={onChange}
        >
          <ResultDisciplineImage
            className={
              value[i] === 2
                ? 'discipline-superior-image-forms'
                : 'discipline-base-image-forms'
            }
            name="disciplines"
            value={i}
            superior={value[i] === 2}
          />
        </div>
      ))}
    </div>
  );
};

export default CryptSearchFormDisciplines;
