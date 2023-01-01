import React, { useState, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  TwdCardsHistoryCardAppearance,
  InventoryFilterForm,
  SortButton,
  CardPopover,
  ConditionalTooltip,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  ResultModal,
} from 'components';
import imbuedClansList from 'assets/data/imbuedClansList.json';
import vampireClansList from 'assets/data/vampireClansList.json';
import { cryptSort } from 'utils';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const TwdCardsHistoryCrypt = ({ cards, players }) => {
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
    cardsByClanTotal[c] = Object.keys(cardsByClan[c]).length;
  });

  const sortedCards = useMemo(
    () => cryptSort(Object.values(cardsByClan[clan]), sortMethod),
    [cardsByClan, sortMethod]
  );

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards);

  const cardRows = sortedCards.map((card, idx) => {
    return (
      <>
        <div
          className="capacity flex items-center justify-center"
          onClick={() => handleModalCardOpen(card)}
        >
          <ResultCryptCapacity value={card.Capacity} />
        </div>
        {!isMobile && (
          <div
            className="content-left disciplines flex items-center"
            onClick={() => handleModalCardOpen(card)}
          >
            <ResultCryptDisciplines value={card.Disciplines} />
          </div>
        )}
        <ConditionalTooltip
          placement={'right'}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
        >
          <div
            className={`name flex items-center justify-start ${
              card.deckid ? '' : 'font-bold'
            } `}
            onClick={() => handleModalCardOpen(card)}
          >
            <ResultCryptName card={card} />
          </div>
        </ConditionalTooltip>
        {!isMobile && (
          <div className="clan-group" onClick={() => handleModalCardOpen(card)}>
            <div className="flex justify-center">
              <ResultClanImage value={card.Clan} />
            </div>
            <div className="flex justify-end text-xs">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                {card.Title && <ResultCryptTitle value={card.Title} />}
              </div>
              <ResultCryptGroup value={card.Group} />
            </div>
          </div>
        )}
        <TwdCardsHistoryCardAppearance
          card={card}
          byPlayer={players[card.player]}
        />
      </>
    );
  });

  const Rows = ({ index, style }) => (
    <div
      style={style}
      className={`border-b border-bgSecondary dark:border-bgSecondaryDark  flex ${
        index % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      {cardRows[index]}
    </div>
  );

  return (
    <div className="inventory-container-crypt">
      <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
        <div className="w-3/4">
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
      <div className="history-crypt-table flex bg-bgSecondary font-bold text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgSecondaryDark">
        {!isMobile && <div className="capacity flex" />}
        {!isMobile && <div className="disciplines flex" />}
        <div className="name flex text-fgName dark:text-fgNameDark" />
        {!isMobile && <div className="clan-group flex" />}
        <div
          className="year flex items-center justify-center"
          title="First Print Date"
        >
          Print
        </div>
        {!isMobile && (
          <div
            className="year flex items-center justify-center"
            title="First TWD Appearance Date"
          >
            Win
          </div>
        )}
        <div
          className="ytw flex items-center justify-center"
          title="Years to Win"
        >
          {isMobile ? 'Y' : 'YtW'}
        </div>
        <div className="player flex items-center" title="First Winner">
          Player
        </div>
        <div className="button flex " />
        {!isMobile && <div className="scroll-bar flex" />}
      </div>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            className="history-crypt-table sm:border border-bgSecondary dark:border-bgSecondaryDark"
            height={height}
            width={width}
            itemCount={cardRows.length}
            itemSize={45}
          >
            {Rows}
          </FixedSizeList>
        )}
      </AutoSizer>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </div>
  );
};

export default TwdCardsHistoryCrypt;
