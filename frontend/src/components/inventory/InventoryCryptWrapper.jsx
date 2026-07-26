import { useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { InventoryCrypt, NewCardSelect } from "@/components";
import { CRYPT, OK } from "@/constants";
import { sharedStore, inventoryStore, useApp } from "@/context";

const InventoryCryptWrapper = ({ inShared, category, onlyNotes, clan, setClan }) => {
  const { cryptCardBase } = useApp();
  const { [CRYPT]: sharedCrypt } = useSnapshot(sharedStore);
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
  const [newCardId, setNewCardId] = useState();
  const newCardFocus = () => newCardRef.current.focus();
  const newCardRef = useRef();
  const handleClick = (e) => setNewCardId(e.value);

  return (
    <>
      {!inShared && (
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
          cards={inShared ? sharedCrypt : inventoryCrypt}
          category={inShared ? OK : category}
          clan={clan}
          setClan={setClan}
          inShared={inShared}
          onlyNotes={onlyNotes}
          withCompact={newCardId}
        />
      </div>
    </>
  );
};

export default InventoryCryptWrapper;
