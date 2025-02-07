import {
  CardImage,
  ResultCryptLayoutText,
  ResultLayoutTextCommon,
  ResultLibraryLayoutText,
} from '@/components';
import { ID } from '@/constants';
import { useApp } from '@/context';

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
