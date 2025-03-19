import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import PeopleFill from '@icons/people-fill.svg?react';
import { Hr, TwdHallFameDeckBody } from '@/components';
import { CREATION_DATE, DATE, EVENT, LOCATION, PLAYERS } from '@/constants';
import { useApp } from '@/context';

const TwdHallFameDeckHeader = ({ deck, isStar }) => {
  const { isMobile } = useApp();
  const [showDeck, setShowDeck] = useState(false);
  const handleClick = () => {
    setShowDeck(!showDeck);
  };

  return (
    <div className="border-borderPrimary bg-bgPrimary dark:border-borderPrimaryDark dark:bg-bgPrimaryDark rounded-md border-2">
      <div
        onClick={handleClick}
        className={twMerge(
          'text-fgSecondary dark:text-fgSecondaryDark flex justify-between p-2.5 hover:underline',
          isStar && 'font-bold',
        )}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div>{deck[PLAYERS]}</div>
            <div className="flex items-center">
              <PeopleFill width="15" height="15" viewBox="0 0 16 16" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div>{`${deck[EVENT]}: ${deck[LOCATION]}`}</div>
          </div>
        </div>
        <div className="whitespace-nowrap">{isMobile ? deck[DATE].slice(0, 4) : deck[DATE]}</div>
      </div>
      {showDeck && (
        <>
          <Hr />
          <div className="p-2.5">
            {showDeck && <TwdHallFameDeckBody deck={{ ...deck, [CREATION_DATE]: deck[DATE] }} />}
          </div>
        </>
      )}
    </div>
  );
};

export default TwdHallFameDeckHeader;
