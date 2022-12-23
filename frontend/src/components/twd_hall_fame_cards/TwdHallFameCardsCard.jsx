import React from 'react';
import { useApp } from 'context';
import {
  ResultCryptTableRowCommon,
  ResultLibraryTableRowCommon,
  TwdOpenDeckButton,
} from 'components';

const TwdHallFameCardsCard = ({ card, idx, handleClick }) => {
  const { isMobile } = useApp();

  return (
    <tr className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${idx % 2 ? 'bg-bgThird dark:bg-bgThirdDark' : 'bg-bgPrimary dark:bg-bgPrimaryDark'}`}>
      {card.Id > 200000 ? (
        <ResultCryptTableRowCommon
          card={card}
          handleClick={handleClick}
        />
      ) : (
        <ResultLibraryTableRowCommon card={card} handleClick={handleClick} />
      )}
      {!isMobile && (
        <td className=" text-center" onClick={() => handleClick(idx)}>
          {card.releaseDate.slice(0, 4)}
        </td>
      )}
      <td className=" text-center" onClick={() => handleClick(idx)}>
        {card.twdDate.slice(0, 4)}
      </td>
      <td className=" text-center">
        {Math.round(
          (new Date(card.twdDate) - new Date(card.releaseDate)) /
            (1000 * 60 * 60 * 24) /
            365
        ) || 1}
      </td>
      <td className={`${isMobile ? '' : ''}`}>
        {card.deckid && (
          <div>
            <TwdOpenDeckButton
              deckid={card.deckid}
              noText={isMobile}
              inHistory
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default TwdHallFameCardsCard;
