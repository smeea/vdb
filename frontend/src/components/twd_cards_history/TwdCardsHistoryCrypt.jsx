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
  ResultName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  ResultModal,
} from '@/components';
import imbuedClansList from '@/assets/data/imbuedClansList.json';
import vampireClansList from '@/assets/data/vampireClansList.json';
import { cryptSort } from '@/utils';
import { useApp } from '@/context';
import { useModalCardController } from '@/hooks';

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

  const cardRows = sortedCards.map((card) => {
    return (
      <>
        <div
          className="flex min-w-[32px] items-center justify-center sm:min-w-[40px]"
          onClick={() => handleModalCardOpen(card)}
        >
          <ResultCryptCapacity card={card} />
        </div>
        {!isMobile && (
          <div
            className="flex min-w-[170px] items-center lg:min-w-[180px]"
            onClick={() => handleModalCardOpen(card)}
          >
            <ResultCryptDisciplines value={card.Disciplines} />
          </div>
        )}
        <div
          className={`flex w-full items-center justify-start ${
            card.deckid ? '' : 'font-bold'
          } `}
          onClick={() => handleModalCardOpen(card)}
        >
          <ConditionalTooltip
            placement={'right'}
            overlay={<CardPopover card={card} />}
            disabled={isMobile}
          >
            <ResultName card={card} />
          </ConditionalTooltip>
        </div>
        {!isMobile && (
          <div
            className="min-w-[60px]"
            onClick={() => handleModalCardOpen(card)}
          >
            <div className="flex justify-center">
              <ResultClanImage value={card.Clan} />
            </div>
            <div className="flex justify-center space-x-1 text-sm">
              <div className="flex w-full justify-end font-bold">
                {card.Title && <ResultCryptTitle value={card.Title} />}
              </div>
              <div className="w-full">
                <ResultCryptGroup value={card.Group} />
              </div>
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
      className={`flex border-b border-bgSecondary  dark:border-bgSecondaryDark ${
        index % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      {cardRows[index]}
    </div>
  );

  return (
    <div className="h-[calc(100vh-132px)] sm:h-[calc(100vh-195px)]">
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
      <div className="flex w-full bg-bgSecondary font-bold text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgSecondaryDark">
        {!isMobile && <div className="flex min-w-[32px] sm:min-w-[40px]" />}
        {!isMobile && <div className="flex min-w-[170px] lg:min-w-[180px]" />}
        <div className="flex w-full" />
        {!isMobile && <div className="flex min-w-[45px]" />}
        <div
          className="flex min-w-[45px] items-center justify-center sm:min-w-[60px]"
          title="First Print Date"
        >
          Print
        </div>
        {!isMobile && (
          <div
            className="flex min-w-[45px] justify-center sm:min-w-[60px]"
            title="First TWD Appearance Date"
          >
            Win
          </div>
        )}
        <div
          className="flex min-w-[25px] justify-center sm:min-w-[65px]"
          title="Years to Win"
        >
          {isMobile ? 'Y' : 'YtW'}
        </div>
        <div
          className="flex min-w-[90px] justify-center sm:min-w-[250px]"
          title="First Winner"
        >
          Player
        </div>
        <div className="flex min-w-[45px] sm:min-w-[110px]" />
      </div>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            className="border-bgSecondary dark:border-bgSecondaryDark sm:border"
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
