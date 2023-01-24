import React from 'react';
import { ResultDisciplineImage } from 'components';

const ResultLibraryDisciplines = ({ value }) => {
  if (value.indexOf('&') != -1) {
    const disciplines = value.split(' & ');
    return (
      <div className="flex items-center">
        <ResultDisciplineImage className="w-[22px]" value={disciplines[0]} />+
        <ResultDisciplineImage className="w-[22px]" value={disciplines[1]} />
      </div>
    );
  } else if (value.indexOf('/') != -1) {
    const disciplines = value.split('/');
    return (
      <div className="flex items-center">
        {disciplines.map((d, idx) => {
          return (
            <React.Fragment key={idx}>
              <ResultDisciplineImage className="w-[22px]" value={d} />
              {idx + 1 < disciplines.length && '/'}
            </React.Fragment>
          );
        })}
      </div>
    );
  } else {
    return <ResultDisciplineImage className="w-[22px]" value={value} />;
  }
};

export default ResultLibraryDisciplines;
