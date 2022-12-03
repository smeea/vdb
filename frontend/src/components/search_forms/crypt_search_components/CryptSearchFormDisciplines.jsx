import React from 'react';
import { ResultDisciplineImage } from 'components';
import disciplinesList from 'assets/data/disciplinesList.json';

const CryptSearchFormDisciplines = ({ value, onChange }) => {
  return (
    <div className="input-group justify-start py-1">
      {disciplinesList.map((d, index) => (
        <div key={index} className={`discipline-container state${value[d]}`}>
          <label
            className="discipline-container flex justify-center items-center"
            htmlFor={d}
          >
            <input
              className="hidden"
              type="button"
              name="disciplines"
              id={d}
              onClick={onChange}
            />
            <ResultDisciplineImage
              className="discipline-base-image-forms"
              value={d}
              superior={false}
            />
            <ResultDisciplineImage
              className="discipline-superior-image-forms"
              value={d}
              superior={true}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default CryptSearchFormDisciplines;
