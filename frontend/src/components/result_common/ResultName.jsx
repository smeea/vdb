import React from 'react';
import { ResultCryptName, ResultLibraryName } from '@/components';

const ResultName = ({ card, colored }) => {
  return (
    <>
      {card.Id > 200000 ? (
        <ResultCryptName card={card} colored={colored} />
      ) : (
        <ResultLibraryName card={card} colored={colored} />
      )}
    </>
  );
};

export default ResultName;
