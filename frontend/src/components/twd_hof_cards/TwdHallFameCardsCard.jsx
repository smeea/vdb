import React from 'react';
import dayjs from 'dayjs';
import { useApp } from '@/context';
import {
  ResultCryptTableRowCommon,
  ResultLibraryTableRowCommon,
  TwdOpenDeckButton,
} from '@/components';
import { TWD_DATE, ID, DECKID, RELEASE_DATE } from '@/constants';

const TwdHallFameCardsCard = ({ card, handleClick }) => {
  const { isMobile } = useApp();

  return (
    <tr className="row-bg border-y border-bgSecondary dark:border-bgSecondaryDark">
      {card[ID] > 200000 ? (
        <ResultCryptTableRowCommon card={card} handleClick={handleClick} noDisciplines={isMobile} />
      ) : (
        <ResultLibraryTableRowCommon card={card} handleClick={handleClick} noBurn={isMobile} />
      )}
      {!isMobile && (
        <td className="min-w-[60px] text-center" onClick={() => handleClick(card)}>
          {card[RELEASE_DATE].slice(0, 4)}
        </td>
      )}
      <td className="min-w-[60px] text-center" onClick={() => handleClick(card)}>
        {card[TWD_DATE].slice(0, 4)}
      </td>
      <td className="min-w-[25px] text-center sm:min-w-[60px]">
        {dayjs(card[TWD_DATE]).diff(dayjs(card[RELEASE_DATE]), 'year')}
      </td>
      <td className="min-w-[45px] sm:min-w-[110px]">
        {card[DECKID] && (
          <div>
            <TwdOpenDeckButton deckid={card[DECKID]} noText={isMobile} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default TwdHallFameCardsCard;
