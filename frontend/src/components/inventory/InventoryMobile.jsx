import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  InventoryNewCryptCard,
  InventoryNewLibraryCard,
  InventoryCrypt,
  InventoryLibrary,
  ButtonFloat,
} from '@/components';
import { useApp, inventoryStore, usedStore } from '@/context';

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
  setMissingCryptByClan,
  setMissingLibraryByType,
  setMissingLibraryByDiscipline,
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
          <div className="sticky top-0 z-20 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[40px]  ">
            <InventoryNewCryptCard
              cards={inventoryCrypt}
              setNewId={setNewCryptId}
              newRef={newCryptRef}
            />
          </div>
          {newCryptId && (
            <div className="top-[46px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[102px]">
              <InventoryCrypt
                cards={{
                  [newCryptId]: inventoryCrypt[newCryptId]
                    ? inventoryCrypt[newCryptId]
                    : { c: cryptCardBase[newCryptId], q: 0 },
                }}
                newFocus={newCryptFocus}
                compact
              />
            </div>
          )}
          {inventoryCrypt && (usedCrypt.soft || usedCrypt.hard) && (
            <div>
              <InventoryCrypt
                withCompact={newCryptId}
                category={sharedInventoryCrypt ? 'ok' : category}
                cards={
                  sharedInventoryCrypt ? sharedInventoryCrypt : inventoryCrypt
                }
                clan={clan}
                setClan={setClan}
                setMissingByClan={setMissingCryptByClan}
                inShared={inShared}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="sticky top-0 z-20 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[40px]  ">
            <InventoryNewLibraryCard
              cards={inventoryLibrary}
              setNewId={setNewLibraryId}
              newRef={newLibraryRef}
            />
          </div>
          {newLibraryId && (
            <div className="top-[46px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[102px]">
              <InventoryLibrary
                cards={{
                  [newLibraryId]: inventoryLibrary[newLibraryId]
                    ? inventoryLibrary[newLibraryId]
                    : { c: libraryCardBase[newLibraryId], q: 0 },
                }}
                newFocus={newLibraryFocus}
                compact
              />
            </div>
          )}
          {inventoryLibrary && (usedLibrary.soft || usedLibrary.hard) && (
            <div>
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
                setMissingLibraryByType={setMissingLibraryByType}
                setMissingLibraryByDiscipline={setMissingLibraryByDiscipline}
                inShared={inShared}
              />
            </div>
          )}
        </>
      )}
      {showFloatingButtons && (
        <ButtonFloat
          onClick={() => setShowCrypt(!showCrypt)}
          position="middle"
          variant="primary"
        >
          <div className="text-[28px]">{showCrypt ? 'LIB' : 'CR'}</div>
        </ButtonFloat>
      )}
    </>
  );
};

export default InventoryMobile;
