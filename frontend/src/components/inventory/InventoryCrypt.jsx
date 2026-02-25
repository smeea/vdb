import { Header, InventoryCryptTable, InventoryFilterForm, SortButton } from "@/components";
import {
  ALL,
  CAPACITY_MAX_MIN,
  CAPACITY_MIN_MAX,
  CLANx,
  CLAN,
  CRYPT,
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
  const { cryptInventorySort, changeCryptInventorySort } = useApp();
  const sortMethods = {
    [NAME]: "N",
    [QUANTITY]: "Q",
    [CLANx]: "CL",
    [GROUPx]: "G",
    [CAPACITY_MIN_MAX]: "C↑",
    [CAPACITY_MAX_MIN]: "C↓",
  };

  const { cardsByClan,
          cardsFilteredBy,
          missing,
          missingTotal,
        } = useInventoryCrypt(cards, category, compact, clan, onlyNotes);

  return (
    <>
      {!compact && (
        <Header>
          <div className="w-3/4 p-1">
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
            setSortMethod={changeCryptInventorySort}
          />
        </Header>
      )}
      <InventoryCryptTable
        sortMethod={cryptInventorySort}
        compact={compact}
        withCompact={withCompact}
        cards={compact ? Object.values(cardsByClan[ALL]) : Object.values(cardsByClan[clan])}
        newFocus={newFocus}
        inShared={inShared}
      />
    </>
  );
};

export default InventoryCrypt;
