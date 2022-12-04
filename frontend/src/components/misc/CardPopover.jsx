import React from 'react';
import { ResultCryptPopover, ResultLibraryPopover } from 'components';
import { useApp } from 'context';

const CardPopover = ({ card }) => {
  const { showImage } = useApp();

  return (
    <div className={showImage ? 'p-1' : 'p-3'}>
      {card.Id > 200000 ? (
        <ResultCryptPopover card={card} />
      ) : (
        <ResultLibraryPopover card={card} />
      )}
    </div>
  );
};

export default CardPopover;
