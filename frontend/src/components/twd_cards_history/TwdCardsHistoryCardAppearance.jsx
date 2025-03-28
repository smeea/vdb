import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { TwdOpenDeckButton } from '@/components';
import { AUTHOR, CRYPT, DECKID, LIBRARY, PLAYER, RELEASE_DATE, TWD, TWD_DATE } from '@/constants';
import { clearSearchForm, searchTwdForm, useApp } from '@/context';

const TwdCardsHistoryCardAppearance = ({ card, byPlayer }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();

  let yearsToWin = null;
  if (card[TWD_DATE]) {
    yearsToWin = dayjs(card[TWD_DATE]).diff(dayjs(card[RELEASE_DATE]), 'year');
  } else {
    yearsToWin = `${dayjs().format('YYYY') - card[RELEASE_DATE].slice(0, 4)}+`;
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
          !card[DECKID] && 'text-fgSecondary dark:text-fgSecondaryDark font-bold',
        )}
      >
        {card[RELEASE_DATE].slice(0, 4)}
      </div>
      <div className="flex max-sm:hidden items-center justify-center min-w-[60px]">
        {card[TWD_DATE]?.slice(0, 4)}
      </div>
      <div
        className={twMerge(
          'flex min-w-[25px] items-center justify-center sm:min-w-[60px]',
          !card[DECKID] && 'text-fgSecondary dark:text-fgSecondaryDark font-bold',
        )}
      >
        {yearsToWin}
      </div>
      <div className="flex min-w-[90px] items-center justify-between sm:min-w-[250px]">
        <div
          className="text-fgSecondary dark:text-fgSecondaryDark inline hover:underline max-sm:text-sm"
          onClick={() => handleClick(card[PLAYER])}
        >
          {card[PLAYER]}
        </div>
        {byPlayer && (
          <div
            className="inline max-sm:hidden"
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
