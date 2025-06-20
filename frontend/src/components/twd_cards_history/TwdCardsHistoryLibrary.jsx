import { useMemo, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import cardtypeSorted from "@/assets/data/cardtypeSorted.json";
import disciplinesExtraList from "@/assets/data/disciplinesExtraList.json";
import disciplinesList from "@/assets/data/disciplinesList.json";
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
} from "@/constants";
import { useApp } from "@/context";
import { useModalCardController } from "@/hooks";
import { librarySort } from "@/utils";

const TwdCardsHistoryLibrary = ({ cards, players }) => {
  const { isMobile } = useApp();

  const [type, setType] = useState(ALL);
  const [discipline, setDiscipline] = useState(ALL);

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

  const cardsByType = {};
  const cardsByTypeTotal = {};
  const typesSorted = [ALL, ...cardtypeSorted];
  typesSorted.forEach((i) => {
    cardsByType[i] = {};
    cardsByTypeTotal[i] = 0;
  });

  const cardsByDiscipline = {};
  const cardsByDisciplineTotal = {};
  const disciplines = [...Object.keys(disciplinesList), ...disciplinesExtraList].toSorted();
  [ALL, NONE, ...disciplines, ...Object.keys(virtuesList)].forEach((i) => {
    cardsByDiscipline[i] = {};
    cardsByDisciplineTotal[i] = 0;
  });

  cards.forEach((card) => {
    const types = card[TYPE].split("/");
    const d = card[DISCIPLINE];
    let disciplines = [NONE];
    if (d.includes("/")) {
      disciplines = d.split("/");
    } else if (d.includes(" & ")) {
      disciplines = d.split(" & ");
    } else if (d) {
      disciplines = [d];
    }

    types.forEach((t) => {
      cardsByTypeTotal[t] += 1;
    });
    cardsByTypeTotal[ALL] += 1;
    cardsByDisciplineTotal[ALL] += 1;

    if (disciplines) {
      disciplines.forEach((i) => {
        cardsByDisciplineTotal[i] += 1;
      });
    } else {
      cardsByDisciplineTotal[NONE] += 1;
    }

    types.forEach((t) => {
      cardsByType[t][card[ID]] = card;
    });
    cardsByType[ALL][card[ID]] = card;
    cardsByDiscipline[ALL][card[ID]] = card;

    if (disciplines) {
      disciplines.forEach((i) => {
        cardsByDiscipline[i][card[ID]] = card;
      });
    } else {
      cardsByDiscipline[NONE][card[ID]] = card;
    }
  });

  const cardsFilteredByType = {};
  const cardsFilteredByTypeTotal = {};
  const cardsFilteredByDiscipline = {};
  const cardsFilteredByDisciplineTotal = {};

  Object.keys(cardsByDiscipline).forEach((d) => {
    cardsFilteredByType[d] = {};
    cardsFilteredByTypeTotal[d] = 0;
  });

  Object.keys(cardsByType[type]).forEach((cardid) => {
    Object.keys(cardsByDiscipline).forEach((d) => {
      if (cardsByDiscipline[d][cardid]) {
        cardsFilteredByType[d][cardid] = cardsByDiscipline[d][cardid];
        cardsFilteredByTypeTotal[d] += 1;
      }
    });
  });

  Object.keys(cardsByType).forEach((t) => {
    cardsFilteredByDiscipline[t] = {};
    cardsFilteredByDisciplineTotal[t] = 0;
  });

  Object.keys(cardsByDiscipline[discipline]).forEach((cardid) => {
    Object.keys(cardsByType).forEach((t) => {
      if (cardsByType[t][cardid]) {
        cardsFilteredByDiscipline[t][cardid] = cardsByType[t][cardid];
        cardsFilteredByDisciplineTotal[t] += 1;
      }
    });
  });

  const sortedCards = useMemo(
    () =>
      librarySort(
        Object.values(cardsByType[type]).filter((i) => {
          return cardsByDiscipline[discipline][i[ID]];
        }),
        sortMethod,
      ),
    [cardsByType, cardsByDiscipline, sortMethod],
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
        <TwdCardsHistoryLibraryRow
          key={card[ID]}
          card={card}
          players={players}
          handleClick={handleModalCardOpen}
        />
      );
    });
  }, [sortedCards]);

  return (
    <div className="h-[calc(100dvh-174px)] sm:h-[calc(100dvh-240px)]">
      <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
        <div className="w-3/4">
          <div className="flex flex-col gap-1">
            <InventoryFilterForm
              value={type}
              setValue={setType}
              values={Object.keys(cardsByType).filter((i) => {
                return Object.keys(cardsFilteredByDiscipline[i]).length;
              })}
              byTotal={cardsFilteredByDisciplineTotal}
              target={TYPE}
            />
            <InventoryFilterForm
              value={discipline}
              setValue={setDiscipline}
              values={Object.keys(cardsByDiscipline).filter((i) => {
                return Object.keys(cardsFilteredByType[i]).length;
              })}
              byTotal={cardsFilteredByTypeTotal}
              target={DISCIPLINE}
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
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            className="border-bgSecondary sm:border dark:border-bgSecondaryDark"
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

export default TwdCardsHistoryLibrary;
