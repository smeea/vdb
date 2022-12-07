import React from 'react';

const ResultLibraryTypeImage = ({ value }) => {
  const cardtypes = value.split('/');

  return (
    <>
      {cardtypes.map((cardtype, index) => {
        const imgSrc = `${process.env.ROOT_URL}images/types/${cardtype
          .toLowerCase()
          .replace(/[\s,:!?'.-]/g, '')}.svg`;

        return (
          <img
            key={index}
            className="type-image-results h-[25px] max-w-none"
            src={imgSrc}
            title={cardtype}
          />
        );
      })}
    </>
  );
};

export default ResultLibraryTypeImage;
