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
          <div className="sticky-selector  ">
            <InventoryNewCryptCard
              cards={inventoryCrypt}
              setNewId={setNewCryptId}
              newRef={newCryptRef}
            />
          </div>
          {newCryptId && (
            <div className="sticky top-[46px] sm:top-[102px] z-10">
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
          <div className="sticky-selector  ">
            <InventoryNewLibraryCard
              cards={inventoryLibrary}
              setNewId={setNewLibraryId}
              newRef={newLibraryRef}
            />
          </div>
          {newLibraryId && (
            <div className="sticky top-[46px] sm:top-[102px] z-10">
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
          variant="float-add-on"
        >
          <div className="text-2xl">{showCrypt ? 'LIB' : 'CR'}</div>
        </ButtonFloat>
      )}
    </>
  );
};

export default InventoryMobile;
