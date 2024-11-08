import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import PeopleFill from '@/assets/images/icons/people-fill.svg?react';
import { useApp } from '@/context';
import { Hr, TwdHallFameDeckBody } from '@/components';
import { PLAYERS, EVENT, LOCATION, DATE } from '@/constants';

const TwdHallFameDeckHeader = ({ deck, isStar }) => {
  const { isMobile } = useApp();
  const [showDeck, setShowDeck] = useState(false);
  const handleClick = () => {
    setShowDeck(!showDeck);
  };

  return (
    <div className="rounded-md border-2 border-borderPrimary bg-bgPrimary dark:border-borderPrimaryDark dark:bg-bgPrimaryDark">
      <div
        onClick={handleClick}
        className={twMerge(
          'flex justify-between p-2.5 text-fgSecondary hover:underline dark:text-fgSecondaryDark',
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
            {showDeck && <TwdHallFameDeckBody deck={{ ...deck, creation_date: deck[DATE] }} />}
          </div>
        </>
      )}
    </div>
  );
};

export default TwdHallFameDeckHeader;
