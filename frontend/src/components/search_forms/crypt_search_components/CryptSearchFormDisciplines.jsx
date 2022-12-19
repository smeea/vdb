import React from 'react';
import { ResultDisciplineImage } from 'components';
import disciplinesList from 'assets/data/disciplinesList.json';

const CryptSearchFormDisciplines = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap">
      {disciplinesList.map((i, index) => (
        <div
          key={index}
          className={`w-[38px] h-[38px] cursor-pointer flex items-center justify-center ${
            value[i] === 0 ? 'opacity-40' : ''
          }`}
          onClick={onChange}
        >
          <ResultDisciplineImage
            className={
              value[i] === 2
                ? 'discipline-image w-[37px]'
                : 'discipline-image w-[32px]'
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
