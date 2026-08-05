import { useState } from "react";
import { List } from "react-window";
import cardtypeSorted from "@/assets/data/cardtypeSorted.json";
import disciplinesExtraList from "@/assets/data/disciplinesExtraList.json";
import disciplinesList from "@/assets/data/disciplinesList.json";
import imbuedClansList from "@/assets/data/imbuedClansList.json";
import vampireClansList from "@/assets/data/vampireClansList.json";
import virtuesList from "@/assets/data/virtuesList.json";
import {
  InventoryFilterForm,
  ResultModal,
  SortButton,
  TwdCardsHistoryLibraryRow,
  WindowRows,
} from "@/components";
import {
  ALL,
  CLAN_DISCIPLINE,
  COST_MAX_MIN,
  COST_MIN_MAX,
  DATE_PRINT,
  DATE_WIN,
  DISCIPLINE,
  ID,
  NAME,
  NONE,
  PLAYER,
  TYPE,
  VALUE,
  CARDS,
  TOTAL,
  CLAN,
} from "@/constants";
import { useApp } from "@/context";
import { useModalCardController } from "@/hooks";
import { getRequirements, librarySort } from "@/utils";

const TwdCardsHistoryLibrary = ({ cards, players }) => {
  const { libraryCardBase, isMobile } = useApp();
  const [type, setType] = useState(ALL);
  const [discipline, setDiscipline] = useState(ALL);
  const [clan, setClan] = useState(ALL);

  const [sortMethod, setSortMethod] = useState(NAME);
  const sortMethods = {
    [NAME]: "N",
    [PLAYER]: "P",
    [DATE_PRINT]: "DP",
    [DATE_WIN]: "DW",
    [TYPE]: "T",
    [CLAN_DISCIPLINE]: "C/D",
    [COST_MIN_MAX]: "C↑",
    [COST_MAX_MIN]: "C↓",
  };

  const requirements = {
    [CLAN]: clan,
    [DISCIPLINE]: discipline,
    [TYPE]: type,
  };

  const cardsByType = {};
  const cardsByDiscipline = {};
  const cardsByClan = {};

  [ALL, ...cardtypeSorted].forEach((i) => {
    cardsByType[i] = {};
  });

  [
    ALL,
    NONE,
    ...[...Object.keys(disciplinesList), ...disciplinesExtraList].toSorted(),
    ...Object.keys(virtuesList),
  ].forEach((i) => {
    cardsByDiscipline[i] = {};
  });

  [ALL, NONE, ...vampireClansList, ...imbuedClansList].forEach((i) => {
    cardsByClan[i] = {};
  });

  Object.keys(cards).forEach((cardid) => {
    const { types, disciplines, clans } = getRequirements(cardid, libraryCardBase, requirements);

    types.forEach((i) => {
      cardsByType[i][cardid] = cards[cardid];
    });

    disciplines.forEach((i) => {
      cardsByDiscipline[i][cardid] = cards[cardid];
    });

    clans.forEach((i) => {
      cardsByClan[i][cardid] = cards[cardid];
    });

    cardsByType[ALL][cardid] = cards[cardid];
    cardsByDiscipline[ALL][cardid] = cards[cardid];
    cardsByClan[ALL][cardid] = cards[cardid];
  });

  const cardsFilteredBy = {
    [TYPE]: {},
    [DISCIPLINE]: {},
    [CLAN]: {},
  };

  Object.keys(cardsByType).forEach((i) => {
    cardsFilteredBy[TYPE][i] = {
      [CARDS]: {},
      [TOTAL]: 0,
    };
    Object.keys(cardsByType[i]).forEach((cardid) => {
      if (cardsByClan[clan][cardid] && cardsByDiscipline[discipline][cardid]) {
        cardsFilteredBy[TYPE][i][CARDS][cardid] = cardsByType[i][cardid];
      }
    });
  });

  Object.keys(cardsByClan).forEach((i) => {
    cardsFilteredBy[CLAN][i] = {
      [CARDS]: {},
      [TOTAL]: 0,
    };
    Object.keys(cardsByClan[i]).forEach((cardid) => {
      if (cardsByType[type][cardid] && cardsByDiscipline[discipline][cardid]) {
        cardsFilteredBy[CLAN][i][CARDS][cardid] = cardsByClan[i][cardid];
      }
    });
  });

  Object.keys(cardsByDiscipline).forEach((i) => {
    cardsFilteredBy[DISCIPLINE][i] = {
      [CARDS]: {},
      [TOTAL]: 0,
    };
    Object.keys(cardsByDiscipline[i]).forEach((cardid) => {
      if (cardsByClan[clan][cardid] && cardsByType[type][cardid]) {
        cardsFilteredBy[DISCIPLINE][i][CARDS][cardid] = cardsByDiscipline[i][cardid];
      }
    });
  });

  Object.keys(cardsFilteredBy).forEach((i) => {
    Object.keys(cardsFilteredBy[i]).forEach(j => {
      cardsFilteredBy[i][j][TOTAL] = Object.keys(cardsFilteredBy[i][j][CARDS]).length;
    })

  });


  const sortedCards = librarySort(
    Object.values(cardsByType[type]).filter((i) => {
      return cardsByDiscipline[discipline][i[ID]];
    }),
    sortMethod,
  );

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards);

  const cardRows = sortedCards.map((card) => {
    const handleClick = () => handleModalCardOpen(card);

    return (
      <TwdCardsHistoryLibraryRow
        key={card[ID]}
        card={card}
        players={players}
        handleClick={handleClick}
      />
    );
  });

  return (
    <div className="h-[calc(100dvh-212px)] sm:h-[calc(100dvh-270px)]">
      <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
        <div className="w-3/4">
          <div className="flex flex-col gap-1">
            {/* TODO fix */}
            <InventoryFilterForm
              value={type}
              setValue={setType}
              values={cardsFilteredBy}
              target={TYPE}
            />
            <InventoryFilterForm
              value={discipline}
              setValue={setDiscipline}
              values={cardsFilteredBy}
              target={DISCIPLINE}
            />
            <InventoryFilterForm
              value={clan}
              setValue={setClan}
              values={cardsFilteredBy}
              target={CLAN}
            />
          </div>
        </div>
        <SortButton
          sortMethods={sortMethods}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
      </div>
      <div className="flex min-h-[38px] w-full bg-bgSecondary font-bold text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgSecondaryDark">
        <div className="flex min-w-[30px] max-sm:hidden" />
        <div className="flex min-w-[40px] max-sm:hidden" />
        <div className="flex w-full" />
        <div className="flex min-w-[80px] max-sm:hidden" />
        <div
          className="flex min-w-[60px] items-center justify-center max-sm:hidden"
          title="First Print Date"
        >
          Print
        </div>
        <div
          className="flex min-w-[60px] items-center justify-center sm:min-w-[45px]"
          title="First TWD Appearance Date"
        >
          Win
        </div>
        <div
          className="flex min-w-[25px] items-center justify-center sm:min-w-[60px]"
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

export default TwdCardsHistoryLibrary;
