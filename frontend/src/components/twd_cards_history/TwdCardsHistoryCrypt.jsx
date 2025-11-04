import { useState } from "react";
import { List } from "react-window";
import imbuedClansList from "@/assets/data/imbuedClansList.json";
import vampireClansList from "@/assets/data/vampireClansList.json";
import {
  InventoryFilterForm,
  ResultModal,
  SortButton,
  TwdCardsHistoryCryptRow,
  WindowRows,
} from "@/components";
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
  VALUE,
} from "@/constants";
import { useApp } from "@/context";
import { useModalCardController } from "@/hooks";
import { cryptSort } from "@/utils";

const TwdCardsHistoryCrypt = ({ cards, players }) => {
  const { isMobile } = useApp();
  const [clan, setClan] = useState(ALL);
  const [sortMethod, setSortMethod] = useState(NAME);
  const sortMethods = {
    [NAME]: "N",
    [PLAYER]: "P",
    [DATE_PRINT]: "DP",
    [DATE_WIN]: "DW",
    [CLAN]: "CL",
    [GROUP]: "G",
    [CAPACITY_MIN_MAX]: "C↑",
    [CAPACITY_MAX_MIN]: "C↓",
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

  const sortedCards = cryptSort(Object.values(cardsByClan[clan]), sortMethod)

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards);

  const cardRows = sortedCards.map((card) => (
    <TwdCardsHistoryCryptRow
      key={card[ID]}
      card={card}
      players={players}
      handleClick={handleModalCardOpen}
    />
  ));

  return (
    <div className="h-[calc(100dvh-166px)] sm:h-[calc(100dvh-225px)]">
      <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
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
      <div className="flex min-h-[38px] w-full bg-bgSecondary font-bold text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgSecondaryDark">
        <div className="flex min-w-[40px] max-sm:hidden" />
        <div className="flex min-w-[170px] max-sm:hidden lg:min-w-[180px]" />
        <div className="flex w-full" />
        <div className="flex min-w-[45px] max-sm:hidden" />
        <div
          className="flex min-w-[60px] items-center justify-center max-sm:hidden"
          title="First Print Date"
        >
          Print
        </div>
        <div
          className="flex min-w-[45px] items-center justify-center sm:min-w-[60px]"
          title="First TWD Appearance Date"
        >
          Win
        </div>
        <div
          className="flex min-w-[25px] items-center justify-center sm:min-w-[65px]"
          title="Years to Win"
        >
          YtW
        </div>
        <div
          className="flex min-w-[90px] items-center max-sm:justify-center sm:min-w-[250px]"
          title="First Winner"
        >
          Player
        </div>
        <div className="flex min-w-[45px] items-center justify-center sm:min-w-[110px]">
          {isMobile ? "D" : "Deck"}
        </div>
      </div>
      <List
        className="border-bgSecondary sm:border dark:border-bgSecondaryDark"
        rowComponent={WindowRows}
        rowCount={cardRows.length}
        rowHeight={45}
        rowProps={{ [VALUE]: cardRows }}
      />
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
