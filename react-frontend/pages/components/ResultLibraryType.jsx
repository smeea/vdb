import React from 'react';

function ResultLibraryType(props) {
  const imgClass='type-image-results';
  const cardtypes = props.cardtype.split('/');
  const cardtype_images = cardtypes.map((cardtype, index) => {
    const imgSrc=process.env.ROOT_URL + 'images/types/' + cardtype.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';
    const imgTitle = cardtype
    return (
      <img key={index} className={imgClass} src={imgSrc} title={imgTitle} />
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
      <>
        {cardtype_images}
      </>
    );
  }
}

export default ResultLibraryType;
