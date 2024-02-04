import React, { useState } from 'react';
import {
  InventoryLibraryTable,
  InventoryFilterForm,
  SortButton,
  Header,
} from '@/components';
import { useInventoryLibrary } from '@/hooks';

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
  const [sortMethod, setSortMethod] = useState('Name');
  const sortMethods = {
    Name: 'N',
    Quantity: 'Q',
    'Type ': 'T',
    'Clan / Discipline': 'C/D',
    'Cost - Min to Max ': 'C↑ ', // SPACE SUFFIX IS INTENTIONAL
    'Cost - Max to Min ': 'C↓ ', // SPACE SUFFIX IS INTENTIONAL
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
  } = useInventoryLibrary(
    cards,
    category,
    compact,
    type,
    discipline,
    onlyNotes
  );

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
              <div className="flex justify-end font-bold  text-midGray dark:text-midGrayDark">
                {missingFilteredTotal ? (
                  <>
                    {missingFilteredTotal} (
                    {Object.values(missingFiltered).length} uniq) miss
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
            ? Object.values(cardsByType['All'])
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
