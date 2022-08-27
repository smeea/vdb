import React, { useState } from 'react';
import { TwdCardsHistoryCardCrypt, InventoryFilterForm } from 'components';
import imbuedClansList from 'assets/data/imbuedClansList.json';
import vampireClansList from 'assets/data/vampireClansList.json';
import { useApp } from 'context';

const TwdCardsHistoryCrypt = ({ cards, players, handleClick }) => {
  const { isMobile } = useApp();

  const [clan, setClan] = useState('All');

  // const [sortMethod, setSortMethod] = useState('Name');
  // const sortMethods = {
  //   Name: 'N',
  //   Quantity: 'Q',
  //   Clan: 'Cl',
  //   Group: 'G',
  //   'Capacity - Min to Max': 'C↑',
  //   'Capacity - Max to Min': 'C↓',
  // };

  const cardsByClan = {};
  const cardsByClanTotal = {};
  const clansSorted = ['All', ...vampireClansList, ...imbuedClansList];
  clansSorted.map((i) => {
    cardsByClan[i] = {};
    cardsByClanTotal[i] = 0;
  });

  cards.map((card) => {
    const i = card.Clan;
    cardsByClan[i][card.Id] = card;
    cardsByClan['All'][card.Id] = card;
  });

  Object.keys(cardsByClan).map((c) => {
    cardsByClanTotal[c] = 0;
  });

  Object.keys(cardsByClan).map((c) => {
    Object.keys(cardsByClan[c]).map((cardid) => {
      cardsByClanTotal[c] += 1;
    });
  });

  return (
    <>
      <InventoryFilterForm
        value={clan}
        setValue={setClan}
        values={Object.keys(cardsByClan).filter((i) => {
          return Object.keys(cardsByClan[i]).length;
        })}
        byTotal={cardsByClanTotal}
        target="crypt"
      />
      <table className="crypt-history-table">
        <thead className="info-message blue">
          <tr>
            <th />
            {!isMobile && <th />}
            {!isMobile && <th />}
            {!isMobile && <th />}
            {!isMobile && <th />}
            <th className="text-align-center" title="First Print Date">
              Print
            </th>
            {!isMobile && (
              <th
                className="text-align-center"
                title="First TWD Appearance Date"
              >
                Win
              </th>
            )}
            <th className="text-align-center" title="Years to Win">
              YtW
            </th>
            <th className="px-0 px-md-2" title="First Winner">
              Player
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {Object.values(cardsByClan[clan]).map((card, idx) => (
            <tr key={card.Id} className={`result-${idx % 2 ? 'even' : 'odd'}`}>
              <TwdCardsHistoryCardCrypt
                handleClick={() => handleClick(idx)}
                card={card}
                byPlayer={players[card.player]}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TwdCardsHistoryCrypt;
