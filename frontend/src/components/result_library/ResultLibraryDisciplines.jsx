import React from 'react';
import { ResultDisciplineImage } from 'components';

const ResultLibraryDisciplines = ({ value }) => {
  if (value.indexOf('&') != -1) {
    const disciplines = value.split(' & ');
    return (
      <>
        <ResultDisciplineImage value={disciplines[0]} />+
        <ResultDisciplineImage value={disciplines[1]} />
      </>
    );
  } else if (value.indexOf('/') != -1) {
    const disciplines = value.split('/');
    return (
      <>
        {disciplines.map((d, idx) => {
          return (
            <React.Fragment key={idx}>
              <ResultDisciplineImage value={d} />
              {idx + 1 < disciplines.length && '/'}
            </React.Fragment>
          );
        })}
      </>
    );
  } else {
    return <ResultDisciplineImage value={value} />;
  }
};

export default ResultLibraryDisciplines;
