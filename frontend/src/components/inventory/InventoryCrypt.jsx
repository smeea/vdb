import React, { useState } from 'react';
import {
  InventoryCryptTable,
  InventoryFilterForm,
  SortButton,
  Header,
} from '@/components';
import { useInventoryCrypt } from '@/hooks';

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
    Name: 'N',
    Group: 'G',
    'Group > Clan': 'G/CL',
    Quantity: 'Q',
    'Quantity > Group': 'Q/G',
    Clan: 'CL',
    'Clan > Group': 'CL/G',
    'Capacity - Min to Max': 'C↑',
    'Capacity - Min to Max > Group': 'C↑/G',
    'Capacity - Max to Min': 'C↓',
    'Capacity - Max to Min > Group': 'C↓/G',
  };

  const {
    cardsByClan,
    cardsByClanTotal,
    cardsByClanUnique,
    missingByClan,
    missingByClanTotal,
  } = useInventoryCrypt(cards, category, compact, onlyNotes);

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
                  {missingByClanTotal[clan]} (
                  {Object.values(missingByClan[clan]).length} uniq) miss
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
        cards={
          compact
            ? Object.values(cardsByClan['All'])
            : Object.values(cardsByClan[clan])
        }
        newFocus={newFocus}
        inShared={inShared}
      />
    </>
  );
};

export default InventoryCrypt;
