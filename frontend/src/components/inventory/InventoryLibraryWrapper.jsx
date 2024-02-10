import React, { useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { NewCardSelect, InventoryLibrary } from '@/components';
import { useApp, inventoryStore } from '@/context';

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
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const [newCardId, setNewCardId] = useState();
  const newCardFocus = () => newCardRef.current.focus();
  const newCardRef = useRef();

  return (
    <>
      {!sharedLibrary && (
        <>
          <div className="p-2 sm:p-0">
            <NewCardSelect
              onChange={(e) => setNewCardId(e.value)}
              ref={newCardRef}
              target="library"
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
          category={sharedLibrary ? 'ok' : category}
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
