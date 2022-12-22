import React from 'react';
import {
  CardImage,
  ResultCryptLayoutText,
  ResultLibraryLayoutText,
} from 'components';
import { useApp } from 'context';

const CardPopover = ({ card }) => {
  const { showImage } = useApp();

  return (
    <div className={showImage ? '' : ''}>
      {showImage ? (
        <CardImage card={card} />
      ) : (
        <div className="bordered-sm max-w-[350px] p-4">
          {card.Id > 200000 ? (
            <ResultCryptLayoutText card={card} />
          ) : (
            <ResultLibraryLayoutText card={card} />
          )}
        </div>
      )}
    </div>
  );
};

export default CardPopover;
