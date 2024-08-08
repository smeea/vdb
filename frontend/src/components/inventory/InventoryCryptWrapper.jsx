import React, { useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { NewCardSelect, InventoryCrypt } from '@/components';
import { useApp, inventoryStore } from '@/context';
import { CRYPT, OK } from '@/utils/constants';

const InventoryCryptWrapper = ({ sharedCrypt, category, onlyNotes, clan, setClan }) => {
  const { cryptCardBase } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const [newCardId, setNewCardId] = useState();
  const newCardFocus = () => newCardRef.current.focus();
  const newCardRef = useRef();

  return (
    <>
      {!sharedCrypt && (
        <>
          <div className="p-2 sm:p-0">
            <NewCardSelect
              onChange={(e) => setNewCardId(e.value)}
              ref={newCardRef}
              target={CRYPT}
              inInventory
            />
          </div>
          {newCardId && (
            <InventoryCrypt
              cards={{
                [newCardId]: inventoryCrypt[newCardId]
                  ? inventoryCrypt[newCardId]
                  : { c: cryptCardBase[newCardId], q: 0 },
              }}
              newFocus={newCardFocus}
              compact
            />
          )}
        </>
      )}
      <div>
        <InventoryCrypt
          cards={sharedCrypt ?? inventoryCrypt}
          category={sharedCrypt ? OK : category}
          clan={clan}
          setClan={setClan}
          inShared={!!sharedCrypt}
          onlyNotes={onlyNotes}
          withCompact={newCardId}
        />
      </div>
    </>
  );
};

export default InventoryCryptWrapper;
