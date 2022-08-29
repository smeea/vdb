import React from 'react';
import { ResultDisciplineImage } from 'components';

const ResultLibraryDisciplines = ({ value }) => {
  let disciplinesImages;

  if (value.indexOf('&') != -1) {
    const disciplines = value.split(' & ');
    let items = disciplines.length;
    disciplinesImages = disciplines.map((d, index) => {
      if (items > 1) {
        items -= 1;
        return (
          <React.Fragment key={index}>
            <ResultDisciplineImage value={d} />+
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            <ResultDisciplineImage value={d} />
          </React.Fragment>
        );
      }
    });
  } else if (value.indexOf('/') != -1) {
    const disciplines = value.split('/');
    let items = disciplines.length;
    disciplinesImages = disciplines.map((d, index) => {
      if (items > 1) {
        items -= 1;
        return (
          <React.Fragment key={index}>
            <ResultDisciplineImage value={d} />/
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            <ResultDisciplineImage value={d} />
          </React.Fragment>
        );
      }
    });
  } else if (value) {
    disciplinesImages = <ResultDisciplineImage value={value} />;
  }

  return <>{disciplinesImages}</>;
};

export default ResultLibraryDisciplines;
