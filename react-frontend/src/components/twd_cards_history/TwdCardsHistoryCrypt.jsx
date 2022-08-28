import React, { useState } from 'react';
import {
  TwdCardsHistoryCardCrypt,
  InventoryFilterForm,
  SortButton,
} from 'components';
import imbuedClansList from 'assets/data/imbuedClansList.json';
import vampireClansList from 'assets/data/vampireClansList.json';
import { inventoryCryptSort } from 'utils';
import { useApp } from 'context';

const TwdCardsHistoryCrypt = ({ cards, players, handleClick }) => {
  const { isMobile } = useApp();

  const [clan, setClan] = useState('All');

  const [sortMethod, setSortMethod] = useState('Name');
  const sortMethods = {
    Name: 'N',
    Player: 'P',
    'Date - Print': 'DP',
    'Date - Win': 'DW',
    Clan: 'CL',
    Group: 'G',
    'Capacity - Min to Max': 'C↑',
    'Capacity - Max to Min': 'C↓',
  };

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

  const sortedCards = inventoryCryptSort(
    Object.values(cardsByClan[clan]),
    sortMethod
  );

  return (
    <>
      <div className="d-flex align-items-center justify-content-between inventory-info">
        <div className="w-75 p-1">
          <InventoryFilterForm
            value={clan}
            setValue={setClan}
            values={Object.keys(cardsByClan).filter((i) => {
              return Object.keys(cardsByClan[i]).length;
            })}
            byTotal={cardsByClanTotal}
            target="crypt"
          />
        </div>
        <SortButton
          sortMethods={sortMethods}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
      </div>
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
          {sortedCards.map((card, idx) => (
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
