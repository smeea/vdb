import React, { useState, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  TwdCardsHistoryCardAppearance,
  InventoryFilterForm,
  SortButton,
  CardPopover,
  ConditionalOverlayTrigger,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
} from 'components';
import imbuedClansList from 'assets/data/imbuedClansList.json';
import vampireClansList from 'assets/data/vampireClansList.json';
import { cryptSort } from 'utils';
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

  const sortedCards = useMemo(
    () => cryptSort(Object.values(cardsByClan[clan]), sortMethod),
    [cardsByClan, sortMethod]
  );

  const cardRows = sortedCards.map((card, index) => {
    return (
      <>
        {!isMobile && (
          <>
        <div
          className="d-flex align-items-center justify-content-center capacity"
          onClick={() => handleClick()}
        >
          <ResultCryptCapacity value={card.Capacity} />
        </div>
          <div
            className="d-flex align-items-center justify-content-left disciplines"
            onClick={() => handleClick()}
          >
            <ResultCryptDisciplines value={card.Disciplines} />
          </div>
          </>
        )}
        <ConditionalOverlayTrigger
          placement={"right"}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
        >
          <div
            className={`d-flex align-items-center justify-content-start name ${card.deckid ? '' : 'bold'} px-1`}
            onClick={() => handleClick()}
          >
            <ResultCryptName card={card} />
          </div>
        </ConditionalOverlayTrigger>
        {!isMobile && (
          <div className="clan-group" onClick={() => handleClick()}>
            <div className="d-flex justify-content-center">
              <ResultClanImage value={card.Clan} />
            </div>
            <div className="d-flex small justify-content-end">
              <div className="bold blue">
                <ResultCryptTitle value={card.Title} />
              </div>
              <ResultCryptGroup value={card.Group} />
            </div>
          </div>
        )}
        <TwdCardsHistoryCardAppearance card={card} byPlayer={players[card.player]} />
      </>
    )
  })

  const Rows = ({ index, style }) => (
    <div
      style={style}
      className={`d-flex bordered ${index % 2 ? 'result-even' : 'result-odd'}`}
    >
      {cardRows[index]}
    </div>
  );

  return (
    <div className="inventory-container-crypt">
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

      <div className="d-flex info-message blue bold history-crypt-table">
        {!isMobile && <div className="d-flex capacity" />}
        {!isMobile && <div className="d-flex disciplines" />}
        <div className="d-flex name" />
        {!isMobile && <div className="d-flex clan-group" />}
        <div className="d-flex align-items-center justify-content-center year"
          title="First Print Date"
        >
          Print
        </div>
        {!isMobile && (
          <div className="d-flex align-items-center justify-content-center year"
            title="First TWD Appearance Date"
          >
            Win
          </div>
        )}
        <div className="d-flex align-items-center justify-content-center ytw"
          title="Years to Win"
        >
          YtW
        </div>
        <div className="d-flex align-items-center player"
          title="First Winner"
        >
          Player
        </div>
        <div className="d-flex button pe-1" />
        {!isMobile && <div className="d-flex scroll-bar" />}
      </div>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            className="inventory-crypt-table"
            height={height}
            width={width}
            itemCount={cardRows.length}
            itemSize={45}
          >
            {Rows}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};

export default TwdCardsHistoryCrypt;
