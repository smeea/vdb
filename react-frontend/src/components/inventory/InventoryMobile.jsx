import React, { useState } from 'react';
import {
  InventoryNewCryptCard,
  InventoryNewLibraryCard,
  InventoryCrypt,
  InventoryLibrary,
} from 'components';
import { useApp } from 'context';

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
  missingByClan,
  missingByType,
  missingByDiscipline,
  setMissingByClan,
  setMissingByType,
  setMissingByDiscipline,
  category,
  setCategory,
  setShowAddDeck,
  setShowAddPrecon,
}) => {
  const {
    cryptCardBase,
    libraryCardBase,
    inventoryCrypt,
    inventoryLibrary,
    usedCryptCards,
    usedLibraryCards,
    showFloatingButtons,
  } = useApp();

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
          {inventoryCrypt && (usedCryptCards.soft || usedCryptCards.hard) && (
            <div className="pt-1">
              <InventoryCrypt
                withCompact={newCryptId}
                category={category}
                cards={inventoryCrypt}
                clan={clan}
                setClan={setClan}
                setMissingByClan={setMissingByClan}
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
          {inventoryLibrary &&
            (usedLibraryCards.soft || usedLibraryCards.hard) && (
              <div className="pt-1">
                <InventoryLibrary
                  withCompact={newLibraryId}
                  category={category}
                  cards={inventoryLibrary}
                  type={type}
                  setType={setType}
                  discipline={discipline}
                  setDiscipline={setDiscipline}
                  setMissingByType={setMissingByType}
                  setMissingByDiscipline={setMissingByDiscipline}
                />
              </div>
            )}
        </>
      )}
      {showFloatingButtons && (
        <div
          onClick={() => setShowCrypt(!showCrypt)}
          className="d-flex float-right-middle float-add-on align-items-center justify-content-center"
        >
          <div className="d-inline" style={{ fontSize: '1.6em' }}>
            {showCrypt ? 'LIB' : 'CR'}
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryMobile;
