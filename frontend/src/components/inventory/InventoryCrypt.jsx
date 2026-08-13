import { Header, InventoryCryptTable, InventoryFilterForm, SortButton } from "@/components";
import {
  CAPACITY_MAX_MIN,
  CAPACITY_MIN_MAX,
  CLAN,
  CLANx,
  GROUPx,
  NAME,
  QUANTITY,
} from "@/constants";
import { useApp } from "@/context";
import { useInventoryCrypt } from "@/hooks";

const InventoryCrypt = ({
  compact,
  withCompact,
  category,
  cards,
  clan,
  setClan,
  newFocus,
  inShared,
  onlyNotes,
}) => {
  const { cryptInventorySort, setCryptInventorySort } = useApp();
  const sortMethods = {
    [NAME]: "N",
    [QUANTITY]: "Q",
    [CLANx]: "CL",
    [GROUPx]: "G",
    [CAPACITY_MIN_MAX]: "C↑",
    [CAPACITY_MAX_MIN]: "C↓",
  };

  const { filteredCards, cardsFilteredBy, missing, missingTotal } = useInventoryCrypt(
    cards,
    category,
    compact,
    clan,
    onlyNotes,
  );

  return (
    <>
      {!compact && (
        <Header>
          <div className="w-full p-1 md:w-5/9 lg:w-1/2">
            <InventoryFilterForm
              value={clan}
              setValue={setClan}
              values={cardsFilteredBy}
              target={CLAN}
            />
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
            sortMethod={cryptInventorySort}
            setSortMethod={setCryptInventorySort}
          />
        </Header>
      )}
      <InventoryCryptTable
        sortMethod={cryptInventorySort}
        compact={compact}
        withCompact={withCompact}
        cards={Object.values(filteredCards)}
        newFocus={newFocus}
        inShared={inShared}
      />
    </>
  );
};

export default InventoryCrypt;
