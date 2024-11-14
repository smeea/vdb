import React, { useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { NewCardSelect, InventoryLibrary } from '@/components';
import { useApp, inventoryStore } from '@/context';
import { LIBRARY, OK } from '@/constants';

const InventoryLibraryWrapper = ({
  sharedLibrary,
  category,
  onlyNotes,
  discipline,
  setDiscipline,
  type,
  setType,
}) => {
  const { libraryCardBase } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const [newCardId, setNewCardId] = useState();
  const newCardFocus = () => newCardRef.current.focus();
  const newCardRef = useRef();

  return (
    <>
      {!sharedLibrary && (
        <>
          <div className="max-sm:p-2">
            <NewCardSelect
              onChange={(e) => setNewCardId(e.value)}
              ref={newCardRef}
              target={LIBRARY}
              inInventory
            />
          </div>
          {newCardId && (
            <InventoryLibrary
              cards={{
                [newCardId]: inventoryLibrary[newCardId]
                  ? inventoryLibrary[newCardId]
                  : { c: libraryCardBase[newCardId], q: 0 },
              }}
              newFocus={newCardFocus}
              compact
            />
          )}
        </>
      )}
      <div>
        <InventoryLibrary
          cards={sharedLibrary ?? inventoryLibrary}
          category={sharedLibrary ? OK : category}
          discipline={discipline}
          setDiscipline={setDiscipline}
          type={type}
          setType={setType}
          inShared={!!sharedLibrary}
          onlyNotes={onlyNotes}
          withCompact={newCardId}
        />
      </div>
    </>
  );
};

export default InventoryLibraryWrapper;
