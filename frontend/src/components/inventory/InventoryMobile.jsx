import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  InventoryNewCryptCard,
  InventoryNewLibraryCard,
  InventoryCrypt,
  InventoryLibrary,
} from 'components';
import { useApp, inventoryStore, usedStore } from 'context';

const InventoryMobile = ({
  newCryptId,
  newLibraryId,
  setNewCryptId,
  setNewLibraryId,
  newCryptRef,
  newLibraryRef,
  newCryptFocus,
  newLibraryFocus,
  clan,
  type,
  discipline,
  setClan,
  setType,
  setDiscipline,
  setMissingByClan,
  setMissingByType,
  setMissingByDiscipline,
  category,
  sharedInventoryCrypt,
  sharedInventoryLibrary,
  inShared,
}) => {
  const { cryptCardBase, libraryCardBase, showFloatingButtons } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const usedLibrary = useSnapshot(usedStore).library;

  const [showCrypt, setShowCrypt] = useState(true);

  return (
    <>
      {showCrypt ? (
        <>
          <div className="sticky-selector py-1 px-1">
            <InventoryNewCryptCard
              cards={inventoryCrypt}
              setNewId={setNewCryptId}
              newRef={newCryptRef}
            />
          </div>
          {newCryptId && (
            <div className="sticky-inv-result">
              <InventoryCrypt
                cards={{
                  [newCryptId]: inventoryCrypt[newCryptId]
                    ? inventoryCrypt[newCryptId]
                    : { c: cryptCardBase[newCryptId], q: 0 },
                }}
                compact={true}
                newFocus={newCryptFocus}
              />
            </div>
          )}
          {inventoryCrypt && (usedCrypt.soft || usedCrypt.hard) && (
            <div className="pt-1">
              <InventoryCrypt
                withCompact={newCryptId}
                category={sharedInventoryCrypt ? 'ok' : category}
                cards={
                  sharedInventoryCrypt ? sharedInventoryCrypt : inventoryCrypt
                }
                clan={clan}
                setClan={setClan}
                setMissingByClan={setMissingByClan}
                inShared={inShared}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="sticky-selector py-1 px-1">
            <InventoryNewLibraryCard
              cards={inventoryLibrary}
              setNewId={setNewLibraryId}
              newRef={newLibraryRef}
            />
          </div>
          {newLibraryId && (
            <div className="sticky-inv-result">
              <InventoryLibrary
                cards={{
                  [newLibraryId]: inventoryLibrary[newLibraryId]
                    ? inventoryLibrary[newLibraryId]
                    : { c: libraryCardBase[newLibraryId], q: 0 },
                }}
                compact={true}
                newFocus={newLibraryFocus}
              />
            </div>
          )}
          {inventoryLibrary && (usedLibrary.soft || usedLibrary.hard) && (
            <div className="pt-1">
              <InventoryLibrary
                withCompact={newLibraryId}
                category={sharedInventoryLibrary ? 'ok' : category}
                cards={
                  sharedInventoryLibrary
                    ? sharedInventoryLibrary
                    : inventoryLibrary
                }
                type={type}
                setType={setType}
                discipline={discipline}
                setDiscipline={setDiscipline}
                setMissingByType={setMissingByType}
                setMissingByDiscipline={setMissingByDiscipline}
                inShared={inShared}
              />
            </div>
          )}
        </>
      )}
      {showFloatingButtons && (
        <div
          onClick={() => setShowCrypt(!showCrypt)}
          className="flex float-right-middle float-add-on items-center justify-center"
        >
          <div className="inline" style={{ fontSize: '1.6em' }}>
            {showCrypt ? 'LIB' : 'CR'}
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryMobile;
