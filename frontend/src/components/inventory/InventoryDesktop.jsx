import React from 'react';
import { Col } from 'react-bootstrap';
import {
  InventoryNewCryptCard,
  InventoryNewLibraryCard,
  InventoryCrypt,
  InventoryLibrary,
  InventoryButtons,
  InventoryShowSelect,
} from 'components';
import { useApp } from 'context';

const InventoryDesktop = ({
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
  } = useApp();

  return (
    <>
      <Col xl={1} className="hide-narrow"></Col>
      <Col md={6} lg={6} xl={5} className="px-0 px-md-2 pe-xl-3">
        <div className="sticky-selector pt-3 pb-2">
          <InventoryNewCryptCard
            cards={inventoryCrypt}
            setNewId={setNewCryptId}
            newRef={newCryptRef}
          />
        </div>
        {newCryptId && (
          <div className="sticky-inv-result py-2">
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
          <div className="pt-2">
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
      </Col>
      <Col md={6} lg={6} xl={4} className="px-0 px-md-2 px-xl-3">
        <div className="sticky-selector pt-3 pb-2">
          <InventoryNewLibraryCard
            cards={inventoryLibrary}
            setNewId={setNewLibraryId}
            newRef={newLibraryRef}
          />
        </div>
        {newLibraryId && (
          <div className="sticky-inv-result py-2">
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
        {inventoryLibrary && (usedLibraryCards.soft || usedLibraryCards.hard) && (
          <div className="pt-2">
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
      </Col>
      <Col lg={2} className="hide-on-lt1200px px-0 px-lg-2 px-xl-3">
        <div className="sticky-buttons">
          <InventoryButtons
            crypt={inventoryCrypt}
            library={inventoryLibrary}
            setShowAddDeck={setShowAddDeck}
            setShowAddPrecon={setShowAddPrecon}
            clan={clan}
            discipline={discipline}
            type={type}
            missingByClan={missingByClan}
            missingByType={missingByType}
            missingByDiscipline={missingByDiscipline}
          />
          <div className="px-4 py-2">
            <InventoryShowSelect
              category={category}
              setCategory={setCategory}
            />
          </div>
        </div>
      </Col>
    </>
  );
};

export default InventoryDesktop;
