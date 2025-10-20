import { useSnapshot } from "valtio";
import {
  Checkbox,
  InventoryButtons,
  InventoryFreezeButton,
  InventoryShowSelect,
} from "@/components";
import { OK } from "@/constants";
import { inventoryStore } from "@/context";

const InventoryMenu = ({
  sharedCrypt,
  sharedLibrary,
  setSharedCrypt,
  setSharedLibrary,
  setShowAddDeck,
  setShowAddPrecon,
  setShowShareModal,
  clan,
  discipline,
  type,
  onlyNotes,
  setOnlyNotes,
  category,
  setCategory,
}) => {
  const { isFrozen } = useSnapshot(inventoryStore);
  const isSharedInventory = sharedCrypt && sharedLibrary;

  return (
    <div className="flex flex-col gap-4">
      <InventoryButtons
        sharedCrypt={sharedCrypt}
        sharedLibrary={sharedLibrary}
        setSharedCrypt={setSharedCrypt}
        setSharedLibrary={setSharedLibrary}
        setShowAddDeck={setShowAddDeck}
        setShowAddPrecon={setShowAddPrecon}
        setShowShareModal={setShowShareModal}
        clan={clan}
        discipline={discipline}
        type={type}
        category={isSharedInventory ? OK : category}
        onlyNotes={onlyNotes}
        isSharedInventory={isSharedInventory}
      />
      {!isSharedInventory && <InventoryFreezeButton isFrozen={isFrozen} />}
      {!isSharedInventory && <InventoryShowSelect category={category} setCategory={setCategory} />}
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
        <Checkbox
          label="Only with Notes"
          checked={onlyNotes}
          onChange={() => setOnlyNotes(!onlyNotes)}
        />
      </div>
    </div>
  );
};

export default InventoryMenu;
