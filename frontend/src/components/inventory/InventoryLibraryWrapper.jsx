import { useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { InventoryLibrary, NewCardSelect } from "@/components";
import { LIBRARY, OK } from "@/constants";
import { sharedStore, inventoryStore, useApp } from "@/context";

const InventoryLibraryWrapper = ({
  inShared,
  category,
  onlyNotes,
  discipline,
  setDiscipline,
  type,
  setType,
  clan,
  setClan,
}) => {
  const { libraryCardBase } = useApp();
  const { [LIBRARY]: sharedLibrary } = useSnapshot(sharedStore);
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const [newCardId, setNewCardId] = useState();
  const newCardFocus = () => newCardRef.current.focus();
  const newCardRef = useRef();
  const handleClick = (e) => setNewCardId(e.value);

  return (
    <>
      {!inShared && (
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
          cards={inShared ? sharedLibrary : inventoryLibrary}
          category={inShared ? OK : category}
          discipline={discipline}
          setDiscipline={setDiscipline}
          type={type}
          setType={setType}
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

export default InventoryLibraryWrapper;
