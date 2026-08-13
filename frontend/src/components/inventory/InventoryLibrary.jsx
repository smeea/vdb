import { Header, InventoryFilterForm, InventoryLibraryTable, SortButton } from "@/components";
import { CLAN, CLAN_DISCIPLINE, DISCIPLINE, NAME, QUANTITY, TYPE } from "@/constants";
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
  const { libraryInventorySort, setLibraryInventorySort } = useApp();
  const sortMethods = {
    [NAME]: "N",
    [QUANTITY]: "Q",
    [TYPE]: "T",
    [CLAN_DISCIPLINE]: "C/D",
  };

  const { cardsFilteredBy, filteredCards, missing, missingTotal } = useInventoryLibrary(
    cards,
    category,
    compact,
    type,
    discipline,
    clan,
    onlyNotes,
  );

  return (
    <>
      {!compact && (
        <Header>
          <div className="w-full p-1 lg:w-2/3">
            <div className="flex flex-col gap-1">
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
            <div className="flex justify-end font-bold text-midGray dark:text-midGrayDark">
              {missingTotal ? (
                <>
                  {missingTotal} ({Object.values(missing).length} uniq) miss
                </>
              ) : null}
            </div>
          </div>
          <SortButton
            sortMethods={sortMethods}
            sortMethod={libraryInventorySort}
            setSortMethod={setLibraryInventorySort}
          />
        </Header>
      )}
      <InventoryLibraryTable
        sortMethod={libraryInventorySort}
        compact={compact}
        withCompact={withCompact}
        cards={Object.values(filteredCards)}
        newFocus={newFocus}
        inShared={inShared}
      />
    </>
  );
};

export default InventoryLibrary;
