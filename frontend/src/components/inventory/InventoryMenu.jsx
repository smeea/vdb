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
  setShowAddDeck,
  setShowAddPrecon,
  setShowShareModal,
  cryptClan,
  libraryClan,
  discipline,
  type,
  onlyNotes,
  setOnlyNotes,
  category,
  setCategory,
  inShared,
}) => {
  const { isFrozen } = useSnapshot(inventoryStore);

  return (
    <div className="flex flex-col gap-4">
      <InventoryButtons
        setShowAddDeck={setShowAddDeck}
        setShowAddPrecon={setShowAddPrecon}
        setShowShareModal={setShowShareModal}
        cryptClan={cryptClan}
        libraryClan={libraryClan}
        discipline={discipline}
        type={type}
        category={inShared ? OK : category}
        onlyNotes={onlyNotes}
        inShared={inShared}
      />
      {!inShared && <InventoryFreezeButton isFrozen={isFrozen} />}
      {!inShared && <InventoryShowSelect category={category} setCategory={setCategory} />}
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
