import React from 'react';
import {
  CardImage,
  ResultCryptLayoutText,
  ResultLibraryLayoutText,
} from 'components';
import { useApp } from 'context';

const CardPopover = ({ card }) => {
  const { showImage } = useApp();

  if (showImage) {
    return <CardImage card={card} />;
  } else {
    return (
      <div className="max-w-[400px] p-4">
        {card.Id > 200000 ? (
          <ResultCryptLayoutText card={card} noClose />
        ) : (
          <ResultLibraryLayoutText card={card} noClose />
        )}
      </div>
    );
  }
};

export default CardPopover;
