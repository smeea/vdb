import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  InventoryNewCryptCard,
  InventoryNewLibraryCard,
  InventoryCrypt,
  InventoryLibrary,
  ButtonFloat,
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
                compact={true}
                newFocus={newCryptFocus}
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
                setMissingByClan={setMissingByClan}
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
                compact={true}
                newFocus={newLibraryFocus}
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
                setMissingByType={setMissingByType}
                setMissingByDiscipline={setMissingByDiscipline}
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
          variant="bg-[#707070] opacity-80"
        >
          <div className="text-2xl">{showCrypt ? 'LIB' : 'CR'}</div>
        </ButtonFloat>
      )}
    </>
  );
};

export default InventoryMobile;
