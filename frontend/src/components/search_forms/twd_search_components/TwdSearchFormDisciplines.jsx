import React from 'react';
import { ResultDisciplineImage } from '@/components';
import disciplinesList from '@/assets/data/disciplinesList.json';
import virtuesList from '@/assets/data/virtuesList.json';

const TwdSearchFormDisciplines = ({ value, onChange }) => {
  return (
    <div className="space-y-1">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
        Library Disciplines:
      </div>
      <div className="flex flex-wrap justify-start ">
        {disciplinesList.map((i, index) => {
          return (
            <div
              key={index}
              className={`flex h-[38px] w-[38px] cursor-pointer items-center justify-center ${
                value[i] ? '' : 'opacity-40'
              }`}
              onClick={onChange}
            >
              <ResultDisciplineImage
                className="w-[31px]"
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
              className={`flex h-[38px] w-[38px] cursor-pointer items-center justify-center ${
                value[i] ? '' : 'opacity-40'
              }`}
              onClick={onChange}
            >
              <ResultDisciplineImage
                className="w-[29px]"
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
