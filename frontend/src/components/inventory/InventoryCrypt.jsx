import React, { useState } from 'react';
import { InventoryCryptTable, InventoryFilterForm, SortButton, Header } from '@/components';
import { useInventoryCrypt } from '@/hooks';
import {
  ALL,
  CAPACITY_MAX_MIN,
  CAPACITY_MIN_MAX,
  CLANx,
  GROUPx,
  NAME,
  QUANTITY,
} from '@/utils/constants';

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
  const [sortMethod, setSortMethod] = useState('Name');
  const sortMethods = {
    [NAME]: 'N',
    [QUANTITY]: 'Q',
    [CLANx]: 'CL',
    [GROUPx]: 'G',
    [CAPACITY_MIN_MAX]: 'C↑',
    [CAPACITY_MAX_MIN]: 'C↓',
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
              target="crypt"
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
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
          />
        </Header>
      )}
      <InventoryCryptTable
        sortMethod={sortMethod}
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
