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
            className="type-image-results max-w-none h-[25px]"
            src={imgSrc}
            title={cardtype}
          />
        );
      })}
    </>
  );
};

export default ResultLibraryTypeImage;
