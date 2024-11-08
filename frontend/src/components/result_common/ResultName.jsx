import React from 'react';
import { ResultCryptName, ResultLibraryName } from '@/components';
import { ID } from '@/constants';

const ResultName = ({ card, isBanned, colored }) => {
  return (
    <>
      {card[ID] > 200000 ? (
        <ResultCryptName card={card} colored={colored} isBanned={isBanned} />
      ) : (
        <ResultLibraryName card={card} colored={colored} isBanned={isBanned} />
      )}
    </>
  );
};

export default ResultName;
