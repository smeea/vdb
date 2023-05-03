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
    return <CardImage card={card} className="max-w-[320px]" />;
  } else {
    return (
      <div className="w-[375px] space-y-3 p-4">
        {card.Id > 200000 ? (
          <ResultCryptLayoutText card={card} noClose inPopover />
        ) : (
          <ResultLibraryLayoutText card={card} noClose />
        )}
        <ResultLayoutTextCommon card={card} inPopover />
      </div>
    );
  }
};

export default CardPopover;
