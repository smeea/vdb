import React from 'react';

function ResultLibraryDisciplines(props) {
  const imgClass = 'discipline-image-results';
  let disciplinesImages;

  if (props.value.indexOf('&') != -1) {
    const disciplines = props.value.split(' & ');
    let items = disciplines.length;
    disciplinesImages = disciplines.map((d, index) => {
      const imgSrc =
        process.env.ROOT_URL + 'images/disciplines/' + d.toLowerCase() + '.gif';
      const imgTitle = d;
      if (items > 1) {
        items -= 1;
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} title={imgTitle} />
            {'+'}
          </span>
        );
      } else {
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} title={imgTitle} />
          </span>
        );
      }
    });
  } else if (props.value.indexOf('/') != -1) {
    const disciplines = props.value.split('/');
    let items = disciplines.length;
    disciplinesImages = disciplines.map((d, index) => {
      const imgSrc =
        process.env.ROOT_URL + 'images/disciplines/' + d.toLowerCase() + '.gif';
      const imgTitle = d;
      if (items > 1) {
        items -= 1;
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} title={imgTitle} />
            {' / '}
          </span>
        );
      } else {
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} title={imgTitle} />
          </span>
        );
      }
    });
  } else if (props.value) {
    const imgSrc =
      process.env.ROOT_URL +
      'images/disciplines/' +
      props.value.toLowerCase() +
      '.gif';
    const imgTitle = props.value;
    disciplinesImages = (
      <img className={imgClass} src={imgSrc} title={imgTitle} />
    );
  }

  return <span className="disciplines">{disciplinesImages}</span>;
}

export default ResultLibraryDisciplines;
