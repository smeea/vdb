import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import { TwdOpenDeckButton } from '@/components';
import { useApp, clearSearchForm, searchTwdForm } from '@/context';
import { RELEASE_DATE, TWD_DATE, DECKID, AUTHOR, PLAYER, CRYPT, LIBRARY, TWD } from '@/constants';

const TwdCardsHistoryCardAppearance = ({ card, byPlayer }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();

  let yearsToWin = null;
  if (card[TWD_DATE]) {
    yearsToWin =
      Math.round(
        (new Date(card[TWD_DATE]) - new Date(card[RELEASE_DATE])) / (1000 * 60 * 60 * 24) / 365,
      ) || 1;
  } else {
    const date = new Date();
    yearsToWin = `${date.getFullYear() - card[RELEASE_DATE].slice(0, 4)}+`;
  }

  const handleClick = (author) => {
    clearSearchForm(TWD);
    searchTwdForm[AUTHOR] = author;
    navigate(`/twd?q=${encodeURIComponent(JSON.stringify({ [AUTHOR]: author }))}`);
  };

  return (
    <>
      <div
        className={twMerge(
          'flex min-w-[45px] items-center justify-center sm:min-w-[60px]',
          !card[DECKID] && 'font-bold text-fgSecondary dark:text-fgSecondaryDark',
        )}
      >
        {card[RELEASE_DATE].slice(0, 4)}
      </div>
      {!isMobile && (
        <div className="flex min-w-[45px] items-center justify-center sm:min-w-[60px]">
          {card[TWD_DATE] && card[TWD_DATE].slice(0, 4)}
        </div>
      )}
      <div
        className={twMerge(
          'flex min-w-[25px] items-center justify-center sm:min-w-[60px]',
          !card[DECKID] && 'font-bold text-fgSecondary dark:text-fgSecondaryDark',
        )}
      >
        {yearsToWin}
      </div>
      <div className="flex min-w-[90px] items-center justify-between sm:min-w-[250px]">
        <div
          className="inline text-fgSecondary hover:underline dark:text-fgSecondaryDark max-sm:text-sm"
          onClick={() => handleClick(card[PLAYER])}
        >
          {card[PLAYER]}
        </div>
        {!isMobile && byPlayer && (
          <div
            className="inline"
            title={`First appearance in TWDA by Player:
Crypt: ${byPlayer[CRYPT]}
Library: ${byPlayer[LIBRARY]}`}
          >
            [{byPlayer[CRYPT] + byPlayer[LIBRARY]}]
          </div>
        )}
      </div>
      <div className="flex min-w-[45px] items-center justify-end sm:min-w-[110px]">
        {card[DECKID] && <TwdOpenDeckButton deckid={card[DECKID]} noText={isMobile} />}
      </div>
    </>
  );
};

export default TwdCardsHistoryCardAppearance;
