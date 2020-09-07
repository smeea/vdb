import React from 'react';

function ResultLibraryDisciplines(props) {
  const imgClass='discipline-image-results';
  let disciplines_images;

  if (props.value.indexOf('&') != -1) {
    const disciplines = props.value.split(' & ');
    let items = disciplines.length;
    disciplines_images = disciplines.map((d, index) => {
      const imgSrc=process.env.ROOT_URL + 'images/disciplines/' + d.toLowerCase() + '.gif';
      if (items > 1) {
        items -= 1;
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} />{'+'}
          </span>
        );
      } else {
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} />
          </span>
        );
      }
    });
  } else if (props.value.indexOf('/') != -1) {
    const disciplines = props.value.split('/');
    let items = disciplines.length;
    disciplines_images = disciplines.map((d, index) => {
      const imgSrc=process.env.ROOT_URL + 'images/disciplines/' + d.toLowerCase() + '.gif';
      if (items > 1) {
        items -= 1;
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} />{' / '}
          </span>
        );
      } else {
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} />
          </span>
        );
      }
    });
  } else if (props.value) {
    const imgSrc=process.env.ROOT_URL + 'images/disciplines/' + props.value.toLowerCase() + '.gif';
    disciplines_images =
      <img className={imgClass} src={imgSrc} />;
  }

  return (
    <span className='disciplines'>
      {disciplines_images}
    </span>
  );
}

export default ResultLibraryDisciplines;
