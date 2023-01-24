import React from 'react';
import {
  CardImage,
  ResultCryptLayoutText,
  ResultLibraryLayoutText,
  ResultLayoutTextCommon,
} from '@/components';
import { useApp } from '@/context';

const CardPopover = ({ card }) => {
  const { showImage } = useApp();

  if (showImage) {
    return <CardImage card={card} />;
  } else {
    return (
      <div className="max-w-[400px] space-y-3 p-4">
        {card.Id > 200000 ? (
          <ResultCryptLayoutText card={card} noClose />
        ) : (
          <ResultLibraryLayoutText card={card} noClose />
        )}
        <ResultLayoutTextCommon card={card} />
      </div>
    );
  }
};

export default CardPopover;
