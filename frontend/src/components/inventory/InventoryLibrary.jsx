import { Header, InventoryFilterForm, InventoryLibraryTable, SortButton } from "@/components";
import { ALL, CLAN, CLAN_DISCIPLINE, DISCIPLINE, ID, NAME, QUANTITY, TYPE } from "@/constants";
import { useApp } from "@/context";
import { useInventoryLibrary } from "@/hooks";

const InventoryLibrary = ({
  compact,
  withCompact,
  category,
  cards,
  type,
  setType,
  discipline,
  setDiscipline,
  clan,
  setClan,
  newFocus,
  inShared,
  onlyNotes,
}) => {
  const { libraryInventorySort, changeLibraryInventorySort } = useApp();
  const sortMethods = {
    [NAME]: "N",
    [QUANTITY]: "Q",
    [TYPE]: "T",
    [CLAN_DISCIPLINE]: "C/D",
  };

  const {
    cardsByType,
    cardsByDiscipline,
    cardsByClan,
    cardsFilteredByType,
    cardsFilteredByTypeTotal,
    cardsFilteredByTypeUnique,
    cardsFilteredByDiscipline,
    cardsFilteredByDisciplineTotal,
    cardsFilteredByDisciplineUnique,
    cardsFilteredByClan,
    cardsFilteredByClanTotal,
    cardsFilteredByClanUnique,
    missingFiltered,
    missingFilteredTotal,
  } = useInventoryLibrary(cards, category, compact, type, discipline, clan, onlyNotes);

  return (
    <>
      {!compact && (
        <Header>
          <div className="w-3/4 p-1">
            <div className="flex flex-col gap-1">
              <InventoryFilterForm
                value={type}
                setValue={setType}
                values={cardsFilteredByType}
                byTotal={cardsFilteredByTypeTotal}
                byUnique={cardsFilteredByTypeUnique}
                target={TYPE}
              />
              <InventoryFilterForm
                value={discipline}
                setValue={setDiscipline}
                values={cardsFilteredByDiscipline}
                byTotal={cardsFilteredByDisciplineTotal}
                byUnique={cardsFilteredByDisciplineUnique}
                target={DISCIPLINE}
              />
              <InventoryFilterForm
                value={clan}
                setValue={setClan}
                values={cardsFilteredByClan}
                byTotal={cardsFilteredByClanTotal}
                byUnique={cardsFilteredByClanUnique}
                target={CLAN}
              />
            </div>
            <div className="flex justify-end font-bold text-midGray dark:text-midGrayDark">
              {missingFilteredTotal ? (
                <>
                  {missingFilteredTotal} ({Object.values(missingFiltered).length} uniq) miss
                </>
              ) : null}
            </div>
          </div>
          <SortButton
            sortMethods={sortMethods}
            sortMethod={libraryInventorySort}
            setSortMethod={changeLibraryInventorySort}
          />
        </Header>
      )}
      <InventoryLibraryTable
        sortMethod={libraryInventorySort}
        compact={compact}
        withCompact={withCompact}
        cards={
          compact
            ? Object.values(cardsByType[ALL])
            : Object.values(cardsByType[type]).filter((i) => {
                return cardsByDiscipline[discipline][i.c[ID]];
              })
        }
        newFocus={newFocus}
        inShared={inShared}
      />
    </>
  );
};

export default InventoryLibrary;
