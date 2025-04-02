import { Header, InventoryCryptTable, InventoryFilterForm, SortButton } from "@/components";
import {
  ALL,
  CAPACITY_MAX_MIN,
  CAPACITY_MIN_MAX,
  CLANx,
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

  const { cardsByClan, cardsByClanTotal, cardsByClanUnique, missingByClan, missingByClanTotal } =
    useInventoryCrypt(cards, category, compact, onlyNotes);

  return (
    <>
      {!compact && (
        <Header>
          <div className="w-3/4 p-1">
            <InventoryFilterForm
              value={clan}
              setValue={setClan}
              values={Object.keys(cardsByClan).filter((i) => {
                return Object.keys(cardsByClan[i]).length;
              })}
              byTotal={cardsByClanTotal}
              byUnique={cardsByClanUnique}
              target={CRYPT}
            />
            <div className="flex justify-end font-bold text-midGray dark:text-midGrayDark">
              {missingByClanTotal[clan] ? (
                <>
                  {missingByClanTotal[clan]} ({Object.values(missingByClan[clan]).length} uniq) miss
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
