import React, { useState } from 'react';
import PeopleFill from '@/assets/images/icons/people-fill.svg?react';
import { useApp } from '@/context';
import { Hr, TwdHallFameDeckBody } from '@/components';

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
        className={`flex justify-between p-2.5 text-fgSecondary hover:underline dark:text-fgSecondaryDark ${
          isStar ? 'font-bold' : ''
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div>{deck.players}</div>
            <div className="flex items-center">
              <PeopleFill width="15" height="15" viewBox="0 0 16 16" />
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div>{`${deck.event}: ${deck.location}`}</div>
          </div>
        </div>
        <div className="whitespace-nowrap">{isMobile ? deck.date.slice(0, 4) : deck.date}</div>
      </div>
      {showDeck && (
        <>
          <Hr />
          <div className="p-2.5">
            {showDeck && <TwdHallFameDeckBody deck={{ ...deck, creation_date: deck.date }} />}
          </div>
        </>
      )}
    </div>
  );
};

export default TwdHallFameDeckHeader;
