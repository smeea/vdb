import React from 'react';

function ResultLibraryType(props) {
  const imgClass='type-image-results';
  const cardtypes = props.cardtype.split('/');
  const cardtype_images = cardtypes.map((cardtype, index) => {
    const imgSrc=process.env.ROOT_URL + 'images/types/' + cardtype.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';
    return (
      <img key={index} className={imgClass} src={imgSrc} />
    );
  });

  if (props.total > 0) {
    return(
      <>
        {cardtype_images} {' '} {props.cardtype} [{props.total}]
      </>
    );
  } else if (props.total == 0) {
    return(
      <>
        {cardtype_images} {' '} {props.cardtype}
      </>
    );
  } else {
    return(
      <span className='type'>
        {cardtype_images}
      </span>
    );
  }
}

export default ResultLibraryType;
