import React from 'react';
import { ResultDisciplineImage } from 'components';
import disciplinesList from 'assets/data/disciplinesList.json';
import virtuesList from 'assets/data/virtuesList.json';

const TwdSearchFormDisciplines = ({ value, onChange }) => {
  return (
    <>
      <div className="flex flex-wrap input-group justify-start py-1">
        {disciplinesList.map((i, index) => {
          return (
            <div
              key={index}
              className={`flex items-center justify-center discipline-container ${
                value[i] ? '' : 'opacity-40'
              }`}
              onClick={onChange}
            >
              <ResultDisciplineImage
                className="discipline-base-image-forms"
                name="disciplines"
                value={i}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap input-group pb-2">
        {virtuesList.map((i, index) => {
          return (
            <div
              key={index}
              className={`flex items-center justify-center discipline-container ${
                value[i] ? '' : 'opacity-40'
              }`}
              onClick={onChange}
            >
              <ResultDisciplineImage
                className="virtue-image"
                name="disciplines"
                value={i}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TwdSearchFormDisciplines;
