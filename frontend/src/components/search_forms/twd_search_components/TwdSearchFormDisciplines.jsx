import React from 'react';
import { ResultDisciplineImage } from 'components';
import disciplinesList from 'assets/data/disciplinesList.json';
import virtuesList from 'assets/data/virtuesList.json';

const TwdSearchFormDisciplines = ({ value, onChange }) => {
  const name = 'disciplines';

  return (
    <>
      <div className="input-group justify-start py-1">
        {disciplinesList.map((i, index) => {
          const disciplineState = `discipline-container state${
            value[i] ? 1 : 0
          }`;
          return (
            <div key={index} className={disciplineState}>
              <label
                className="discipline-container flex items-center justify-center"
                htmlFor={i}
              >
                <input
                  className="hidden"
                  type="button"
                  name={name}
                  id={i}
                  onClick={onChange}
                />
                <ResultDisciplineImage
                  className="discipline-base-image-forms"
                  value={i}
                />
              </label>
            </div>
          );
        })}
      </div>
      <div className="input-group pb-2">
        {virtuesList.map((i, index) => {
          const virtueState = `virtue-container state${value[i] ? 1 : 0}`;
          return (
            <div key={index} className={virtueState}>
              <label
                className="virtue-container flex items-center justify-center"
                htmlFor={i}
              >
                <input
                  className="hidden"
                  type="button"
                  name={name}
                  id={i}
                  onClick={onChange}
                />
                <ResultDisciplineImage className="virtue-image" value={i} />
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TwdSearchFormDisciplines;
