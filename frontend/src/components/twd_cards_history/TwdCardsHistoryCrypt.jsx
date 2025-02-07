import { useMemo, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import imbuedClansList from '@/assets/data/imbuedClansList.json';
import vampireClansList from '@/assets/data/vampireClansList.json';
import {
  InventoryFilterForm,
  ResultModal,
  SortButton,
  TwdCardsHistoryCryptRow,
  WindowRows,
} from '@/components';
import {
  ALL,
  CAPACITY_MAX_MIN,
  CAPACITY_MIN_MAX,
  CLAN,
  CRYPT,
  DATE_PRINT,
  DATE_WIN,
  GROUP,
  ID,
  NAME,
  PLAYER,
} from '@/constants';
import { useApp } from '@/context';
import { useModalCardController } from '@/hooks';
import { cryptSort } from '@/utils';

const TwdCardsHistoryCrypt = ({ cards, players }) => {
  const { isMobile } = useApp();
  const [clan, setClan] = useState(ALL);
  const [sortMethod, setSortMethod] = useState([NAME]);
  const sortMethods = {
    [NAME]: 'N',
    [PLAYER]: 'P',
    [DATE_PRINT]: 'DP',
    [DATE_WIN]: 'DW',
    [CLAN]: 'CL',
    [GROUP]: 'G',
    [CAPACITY_MIN_MAX]: 'C↑',
    [CAPACITY_MAX_MIN]: 'C↓',
  };

  const cardsByClan = {};
  const cardsByClanTotal = {};
  const clansSorted = [ALL, ...vampireClansList, ...imbuedClansList];
  clansSorted.forEach((i) => {
    cardsByClan[i] = {};
    cardsByClanTotal[i] = 0;
  });

  cards.forEach((card) => {
    cardsByClan[card[CLAN]][card[ID]] = card;
    cardsByClan[ALL][card[ID]] = card;
  });

  Object.keys(cardsByClan).forEach((c) => {
    cardsByClanTotal[c] = Object.keys(cardsByClan[c]).length;
  });

  const sortedCards = useMemo(
    () => cryptSort(Object.values(cardsByClan[clan]), sortMethod),
    [cardsByClan, sortMethod],
  );

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards);

  const cardRows = useMemo(() => {
    return sortedCards.map((card) => {
      return (
        <TwdCardsHistoryCryptRow
          key={card[ID]}
          card={card}
          players={players}
          handleClick={handleModalCardOpen}
        />
      );
    });
  }, [sortedCards]);

  return (
    <div className="h-[calc(100dvh-132px)] sm:h-[calc(100dvh-195px)]">
      <div className="bg-bgSecondary dark:bg-bgSecondaryDark flex items-center justify-between">
        <div className="w-3/4">
          <InventoryFilterForm
            value={clan}
            setValue={setClan}
            values={Object.keys(cardsByClan).filter((i) => {
              return Object.keys(cardsByClan[i]).length;
            })}
            byTotal={cardsByClanTotal}
            target={CRYPT}
          />
        </div>
        <SortButton
          sortMethods={sortMethods}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
      </div>
      <div className="bg-bgSecondary text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgSecondaryDark flex w-full font-bold">
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
            className="flex min-w-[45px] items-center justify-center sm:min-w-[60px]"
            title="First TWD Appearance Date"
          >
            Win
          </div>
        )}
        <div
          className="flex min-w-[25px] items-center justify-center sm:min-w-[65px]"
          title="Years to Win"
        >
          YtW
        </div>
        <div className="flex min-w-[90px] items-center sm:min-w-[250px]" title="First Winner">
          Player
        </div>
        <div className="flex min-w-[45px] items-center justify-center sm:min-w-[110px]">
          {isMobile ? 'D' : 'Deck'}
        </div>
      </div>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            className="border-bgSecondary dark:border-bgSecondaryDark sm:border"
            height={height}
            width={width}
            itemCount={cardRows.length}
            itemSize={45}
            itemData={cardRows}
          >
            {WindowRows}
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
