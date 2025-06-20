import { useCallback, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { InventoryCrypt, NewCardSelect } from "@/components";
import { CRYPT, OK } from "@/constants";
import { inventoryStore, useApp } from "@/context";

const InventoryCryptWrapper = ({ sharedCrypt, category, onlyNotes, clan, setClan }) => {
  const { cryptCardBase } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
  const [newCardId, setNewCardId] = useState();
  const newCardFocus = () => newCardRef.current.focus();
  const newCardRef = useRef();

  const handleClick = useCallback((e) => {
    setNewCardId(e.value);
  }, []);

  return (
    <>
      {!sharedCrypt && (
        <>
          <div className="max-sm:p-2">
            <NewCardSelect onChange={handleClick} ref={newCardRef} target={CRYPT} inInventory />
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
