import {
  ButtonFloatClose,
  ButtonIconed,
  DeckExportButton,
  InventoryDeleteButton,
  InventoryImport,
  InventoryMissingButton,
  InventoryShareButton,
} from "@/components";
import { AUTHOR, CRYPT, DECKS, IS_FROZEN, LIBRARY, NAME } from "@/constants";
import { deckStore, inventoryStore, useApp } from "@/context";
import FolderPlus from "@icons/folder-plus.svg?react";
import Folder2Open from "@icons/folder2-open.svg?react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { useSnapshot } from "valtio";

const InventoryButtons = ({
  setShowAddDeck,
  setShowAddPrecon,
  clan,
  type,
  discipline,
  category,
  onlyNotes,
  isSharedInventory,
  sharedCrypt,
  sharedLibrary,
  setSharedCrypt,
  setSharedLibrary,
  setShowShareModal,
}) => {
  const {
    preconDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    publicName,
    isNarrow,
    isDesktop,
  } = useApp();

  const {
    [IS_FROZEN]: isFrozen,
    [CRYPT]: inventoryCrypt,
    [LIBRARY]: inventoryLibrary,
  } = useSnapshot(inventoryStore);
  const decks = useSnapshot(deckStore)[DECKS];
  const navigate = useNavigate();
  const crypt = isSharedInventory ? sharedCrypt : inventoryCrypt;
  const library = isSharedInventory ? sharedLibrary : inventoryLibrary;

  const handleClose = () => {
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        {isSharedInventory && (
          <ButtonIconed
            variant={isDesktop ? "secondary" : "primary"}
            onClick={() => {
              setShowMenuButtons(false);
              setShowFloatingButtons(true);
              setSharedCrypt(null);
              setSharedLibrary(null);
              navigate("/inventory");
            }}
            title="Back to My Inventory"
            icon={<Folder2Open />}
            text="Back to My Inventory"
          />
        )}
        <DeckExportButton
          deck={{
            [NAME]: `Inventory ${dayjs().format("YYYY-MM-DD")}`,
            [AUTHOR]: publicName,
            [CRYPT]: crypt,
            [LIBRARY]: library,
          }}
          inInventory
        />
        {!isSharedInventory && (
          <>
            {!isFrozen && (
              <>
                <InventoryImport />
                {decks && (
                  <ButtonIconed
                    variant={isDesktop ? "secondary" : "primary"}
                    onClick={() => {
                      setShowAddDeck(true);
                      setShowMenuButtons(false);
                      setShowFloatingButtons(false);
                    }}
                    title="Add from your Deck"
                    icon={<FolderPlus />}
                    text="Add from Deck"
                  />
                )}
                {preconDecks && (
                  <ButtonIconed
                    variant={isDesktop ? "secondary" : "primary"}
                    onClick={() => {
                      setShowAddPrecon(true);
                      setShowMenuButtons(false);
                      setShowFloatingButtons(false);
                    }}
                    title="Add from Preconstructed Deck"
                    icon={<FolderPlus />}
                    text="Add from Precon"
                  />
                )}
                <InventoryDeleteButton />
              </>
            )}
            <InventoryMissingButton
              crypt={crypt}
              library={library}
              category={category}
              onlyNotes={onlyNotes}
              clan={clan}
              type={type}
              discipline={discipline}
            />
            <InventoryShareButton setShow={setShowShareModal} />
          </>
        )}
      </div>
      <ButtonFloatClose className="lg:hidden" handleClose={handleClose} />
    </>
  );
};

export default InventoryButtons;
