import React from 'react';
import {
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  TwdCardsHistoryCardAppearance,
} from 'components';
import { useApp } from 'context';

const TwdCardsHistoryCardCrypt = ({ card, byPlayer, handleClick }) => {
  const { isMobile } = useApp();

  return (
    <>
      {!isMobile && (
        <td className="capacity px-2" onClick={() => handleClick()}>
          <ResultCryptCapacity value={card.Capacity} />
        </td>
      )}
      {!isMobile && (
        <td className="disciplines" onClick={() => handleClick()}>
          <ResultCryptDisciplines
            maxDisciplines={null}
            value={card.Disciplines}
          />
        </td>
      )}
      <td
        className={`name px-1 px-md-2 ${card.deckid ? '' : 'bold'}`}
        onClick={() => handleClick()}
      >
        <ResultCryptName card={card} />
      </td>
      {!isMobile && (
        <td className="clan-group" onClick={() => handleClick()}>
          <div>
            <ResultClanImage value={card.Clan} />
          </div>
          <div className="d-flex small justify-content-end">
            <div className="bold blue">
              <ResultCryptTitle value={card.Title} />
            </div>
            <ResultCryptGroup value={card.Group} />
          </div>
        </td>
      )}
      <TwdCardsHistoryCardAppearance card={card} byPlayer={byPlayer} />
    </>
  );
};

export default TwdCardsHistoryCardCrypt;
