import React from 'react';
import { TwdOpenDeckButton } from 'components';

const TwdCardsHistoryCardAppearance = ({ card, byPlayer }) => {
  let yearsToWin = null;
  if (card.deckid) {
    yearsToWin = card.twd_date - card.release_date + 1;
  } else {
    const date = new Date();
    yearsToWin = `${date.getFullYear() - card.release_date}+`;
  }

  return (
    <>
      <td className="px-4" />
      <td className={`px-2 ${card.deckid ? '' : 'bold blue'}`}>
        {card.release_date}
      </td>
      <td className="px-2">{card.twd_date}</td>
      <td className={`px-2 ${card.deckid ? '' : 'bold blue'}`}>{yearsToWin}</td>
      <td className="px-2">
        <div className="d-flex justify-content-between align-items-center">
          {card.player}
          {byPlayer && (
            <div
              className="d-inline ps-2"
              title={`First appearance in TWDA:
Crypt: ${byPlayer.crypt}
Library: ${byPlayer.library}`}
            >
              [{byPlayer.crypt + byPlayer.library}]
            </div>
          )}
        </div>
      </td>
      <td className="px-0">
        {card.deckid && <TwdOpenDeckButton deckid={card.deckid} inHistory />}
      </td>
    </>
  );
};

export default TwdCardsHistoryCardAppearance;
