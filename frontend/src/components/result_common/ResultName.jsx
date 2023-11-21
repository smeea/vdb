import React from 'react';
import { ResultCryptName, ResultLibraryName } from '@/components';

const ResultName = ({ card, isBanned, colored }) => {
  return (
    <>
      {card.Id > 200000 ? (
        <ResultCryptName card={card} colored={colored} isBanned={isBanned} />
      ) : (
        <ResultLibraryName card={card} colored={colored} isBanned={isBanned} />
      )}
    </>
  );
};

export default ResultName;
