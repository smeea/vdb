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
            className="dark:brightness-[0.85] drop-shadow-[0px_0px_0.8px_#9a9a9a] dark:drop-shadow-[0px_0px_0.8px_#e0e0e0] inline h-[25px]"
            src={imgSrc}
            title={cardtype}
          />
        );
      })}
    </>
  );
};

export default ResultLibraryTypeImage;
