import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TwdOpenDeckButton } from '@/components';
import { useApp, clearSearchForm, searchTwdForm } from '@/context';
import { TWD } from '@/utils/constants';

const TwdCardsHistoryCardAppearance = ({ card, byPlayer }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();

  let yearsToWin = null;
  if (card.twdDate) {
    yearsToWin =
      Math.round(
        (new Date(card.twdDate) - new Date(card.release_date)) / (1000 * 60 * 60 * 24) / 365,
      ) || 1;
  } else {
    const date = new Date();
    yearsToWin = `${date.getFullYear() - card.release_date.slice(0, 4)}+`;
  }

  const handleClick = (author) => {
    clearSearchForm(TWD);
    searchTwdForm.author = author;
    navigate(`/twd?q=${encodeURIComponent(JSON.stringify({ author: author }))}`);
  };

  return (
    <>
      <div
        className={`flex min-w-[45px] items-center justify-center sm:min-w-[60px] ${
          card.deckid ? '' : 'font-bold text-fgSecondary dark:text-fgSecondaryDark'
        }`}
      >
        {card.release_date.slice(0, 4)}
      </div>
      {!isMobile && (
        <div className="flex min-w-[45px] items-center justify-center sm:min-w-[60px]">
          {card.twdDate && card.twdDate.slice(0, 4)}
        </div>
      )}
      <div
        className={`flex min-w-[25px] items-center justify-center sm:min-w-[60px] ${
          card.deckid ? '' : 'font-bold text-fgSecondary dark:text-fgSecondaryDark'
        }`}
      >
        {yearsToWin}
      </div>
      <div className="flex min-w-[90px] items-center justify-between sm:min-w-[250px]">
        <div
          className="inline text-fgSecondary hover:underline dark:text-fgSecondaryDark max-sm:text-sm"
          onClick={() => handleClick(card.player)}
        >
          {card.player}
        </div>
        {!isMobile && byPlayer && (
          <div
            className="inline"
            title={`First appearance in TWDA by Player:
Crypt: ${byPlayer.crypt}
Library: ${byPlayer.library}`}
          >
            [{byPlayer.crypt + byPlayer.library}]
          </div>
        )}
      </div>
      <div className="flex min-w-[45px] items-center justify-end sm:min-w-[110px]">
        {card.deckid && <TwdOpenDeckButton deckid={card.deckid} noText={isMobile} />}
      </div>
    </>
  );
};

export default TwdCardsHistoryCardAppearance;
