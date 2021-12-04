import React from 'react';
import ResultDisciplineImage from './ResultDisciplineImage.jsx';

function ResultLibraryDisciplines(props) {
  let disciplinesImages;

  if (props.value.indexOf('&') != -1) {
    const disciplines = props.value.split(' & ');
    let items = disciplines.length;
    disciplinesImages = disciplines.map((d, index) => {
      if (items > 1) {
        items -= 1;
        return (
          <span key={index}>
            <ResultDisciplineImage value={d} />+
          </span>
        );
      } else {
        return (
          <span key={index}>
            <ResultDisciplineImage value={d} />
          </span>
        );
      }
    });
  } else if (props.value.indexOf('/') != -1) {
    const disciplines = props.value.split('/');
    let items = disciplines.length;
    disciplinesImages = disciplines.map((d, index) => {
      if (items > 1) {
        items -= 1;
        return (
          <span key={index}>
            <ResultDisciplineImage value={d} />/
          </span>
        );
      } else {
        return (
          <span key={index}>
            <ResultDisciplineImage value={d} />
          </span>
        );
      }
    });
  } else if (props.value) {
    disciplinesImages = <ResultDisciplineImage value={props.value} />;
  }

  return <span className="disciplines">{disciplinesImages}</span>;
}

export default ResultLibraryDisciplines;
