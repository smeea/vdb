import React from 'react';
import {
  CardImage,
  ResultCryptLayoutText,
  ResultLibraryLayoutText,
  ResultLayoutTextCommon,
} from '@/components';
import { useApp } from '@/context';
import { ID } from '@/constants';

const CardPopover = ({ card }) => {
  const { showImage } = useApp();

  if (showImage) {
    return <CardImage card={card} size="sm" />;
  } else {
    return (
      <div className="flex w-[375px] flex-col gap-3 p-4">
        {card[ID] > 200000 ? (
          <ResultCryptLayoutText card={card} inPopover />
        ) : (
          <ResultLibraryLayoutText card={card} inPopover />
        )}
        <ResultLayoutTextCommon card={card} inPopover />
      </div>
    );
  }
};

export default CardPopover;
