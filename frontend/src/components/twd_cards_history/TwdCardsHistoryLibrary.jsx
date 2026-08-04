import { useState } from "react";
import { List } from "react-window";
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
  VALUE,
  CARDS,
  TOTAL,
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
  [ALL, ...cardtypeSorted].forEach((i) => {
    cardsByType[i] = {
      [CARDS]: {},
      [TOTAL]: 0,
    };
  });

  const cardsByDiscipline = {};
  [
    ALL,
    NONE,
    ...[...Object.keys(disciplinesList), ...disciplinesExtraList].toSorted(),
    ...Object.keys(virtuesList),
  ].forEach((i) => {
    cardsByDiscipline[i] = {
      [CARDS]: {},
      [TOTAL]: 0,
    };
  });

  Object.values(cards).forEach((card) => {
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
      cardsByType[t][CARDS][card[ID]] = card;
    });
    cardsByType[ALL][CARDS][card[ID]] = card;
    cardsByDiscipline[ALL][CARDS][card[ID]] = card;

    if (disciplines) {
      disciplines.forEach((i) => {
        cardsByDiscipline[i][CARDS][card[ID]] = card;
      });
    } else {
      cardsByDiscipline[NONE][CARDS][card[ID]] = card;
    }
  });

  // TODO fix
  // const cardsFilteredByType = {};
  // const cardsFilteredByDiscipline = {};

  // Object.keys(cardsByDiscipline).forEach((d) => {
  //   cardsFilteredByType[d] = {};
  // });

  // Object.keys(cardsByType[type]).forEach((cardid) => {
  //   Object.keys(cardsByDiscipline).forEach((d) => {
  //     if (cardsByDiscipline[d][cardid]) {
  //       cardsFilteredByType[d][cardid] = cardsByDiscipline[d][cardid];
  //     }
  //   });
  // });

  // Object.keys(cardsByType).forEach((t) => {
  //   cardsFilteredByDiscipline[t] = {};
  // });

  // Object.keys(cardsByDiscipline[discipline]).forEach((cardid) => {
  //   Object.keys(cardsByType).forEach((t) => {
  //     if (cardsByType[t][cardid]) {
  //       cardsFilteredByDiscipline[t][cardid] = cardsByType[t][cardid];
  //     }
  //   });
  // });

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
            {/* <InventoryFilterForm */}
            {/*   value={type} */}
            {/*   setValue={setType} */}
            {/*   values={Object.keys(cardsByType).filter((i) => { */}
            {/*     return Object.keys(cardsFilteredByDiscipline[i]).length; */}
            {/*   })} */}
            {/*   target={TYPE} */}
            {/* /> */}
            {/* <InventoryFilterForm */}
            {/*   value={discipline} */}
            {/*   setValue={setDiscipline} */}
            {/*   values={Object.keys(cardsByDiscipline).filter((i) => { */}
            {/*     return Object.keys(cardsFilteredByType[i]).length; */}
            {/*   })} */}
            {/*   target={DISCIPLINE} */}
            {/* /> */}
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
