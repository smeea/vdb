import React from 'react';
import { ResultDisciplineImage } from 'components';
import disciplinesList from 'assets/data/disciplinesList.json';
import virtuesList from 'assets/data/virtuesList.json';

const TwdSearchFormDisciplines = ({ value, onChange }) => {
  return (
    <div className="space-y-1">
      <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Library Disciplines:</div>
      <div className="flex flex-wrap justify-start ">
        {disciplinesList.map((i, index) => {
          return (
            <div
              key={index}
              className={`w-[38px] h-[38px] cursor-pointer flex items-center justify-center ${
                value[i] ? '' : 'opacity-40'
              }`}
              onClick={onChange}
            >
              <ResultDisciplineImage
                className="w-[25px] discipline-image"
                name="disciplines"
                value={i}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap ">
        {virtuesList.map((i, index) => {
          return (
            <div
              key={index}
              className={`w-[38px] h-[38px] cursor-pointer flex items-center justify-center ${
                value[i] ? '' : 'opacity-40'
              }`}
              onClick={onChange}
            >
              <ResultDisciplineImage
                className="discipline-image w-[29px]"
                name="disciplines"
                value={i}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TwdSearchFormDisciplines;
