import { useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { InventoryLibrary, NewCardSelect } from "@/components";
import { LIBRARY, OK } from "@/constants";
import { inventoryStore, useApp } from "@/context";

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
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const [newCardId, setNewCardId] = useState();
  const newCardFocus = () => newCardRef.current.focus();
  const newCardRef = useRef();
  const handleClick = (e) => setNewCardId(e.value);

  return (
    <>
      {!sharedLibrary && (
        <>
          <div className="max-sm:p-2">
            <NewCardSelect onChange={handleClick} ref={newCardRef} target={LIBRARY} inInventory />
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
          category={sharedLibrary ? OK : category}
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
