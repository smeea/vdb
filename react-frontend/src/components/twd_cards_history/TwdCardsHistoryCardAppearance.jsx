import React from 'react';
import { TwdOpenDeckButton } from 'components';

const TwdCardsHistoryCardAppearance = ({ card }) => {
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
      <td className="px-2">{card.player}</td>
      <td className="px-0">
        {card.deckid && <TwdOpenDeckButton deckid={card.deckid} inHistory />}
      </td>
    </>
  );
};

export default TwdCardsHistoryCardAppearance;
