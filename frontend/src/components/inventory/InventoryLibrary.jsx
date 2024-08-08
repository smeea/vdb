import React, { useState } from 'react';
import { InventoryLibraryTable, InventoryFilterForm, SortButton, Header } from '@/components';
import { useInventoryLibrary } from '@/hooks';
import { ALL, CLAN_DISCIPLINE, NAME, QUANTITY, TYPE } from '@/utils/constants';

const InventoryLibrary = ({
  compact,
  withCompact,
  category,
  cards,
  type,
  setType,
  discipline,
  setDiscipline,
  newFocus,
  inShared,
  onlyNotes,
}) => {
  const [sortMethod, setSortMethod] = useState(NAME);
  const sortMethods = {
    [NAME]: 'N',
    [QUANTITY]: 'Q',
    [TYPE]: 'T',
    [CLAN_DISCIPLINE]: 'C/D',
  };

  const {
    cardsByType,
    cardsByDiscipline,
    cardsFilteredByType,
    cardsFilteredByTypeTotal,
    cardsFilteredByTypeUnique,
    cardsFilteredByDiscipline,
    cardsFilteredByDisciplineTotal,
    cardsFilteredByDisciplineUnique,
    missingFiltered,
    missingFilteredTotal,
  } = useInventoryLibrary(cards, category, compact, type, discipline, onlyNotes);

  return (
    <>
      {!compact && (
        <>
          <Header>
            <div className="w-3/4 p-1">
              <div className="flex flex-col space-y-1">
                <InventoryFilterForm
                  value={type}
                  setValue={setType}
                  values={Object.keys(cardsByType).filter((i) => {
                    return Object.keys(cardsFilteredByDiscipline[i]).length;
                  })}
                  byTotal={cardsFilteredByDisciplineTotal}
                  byUnique={cardsFilteredByDisciplineUnique}
                  target="type"
                />
                <InventoryFilterForm
                  value={discipline}
                  setValue={setDiscipline}
                  values={Object.keys(cardsByDiscipline).filter((i) => {
                    return Object.keys(cardsFilteredByType[i]).length;
                  })}
                  byTotal={cardsFilteredByTypeTotal}
                  byUnique={cardsFilteredByTypeUnique}
                  target="discipline"
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
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
            />
          </Header>
        </>
      )}
      <InventoryLibraryTable
        sortMethod={sortMethod}
        compact={compact}
        withCompact={withCompact}
        cards={
          compact
            ? Object.values(cardsByType[ALL])
            : Object.values(cardsByType[type]).filter((i) => {
                return cardsByDiscipline[discipline][i.c.Id];
              })
        }
        newFocus={newFocus}
        inShared={inShared}
      />
    </>
  );
};

export default InventoryLibrary;
