import FolderPlus from "@icons/folder-plus.svg?react";
import Folder2Open from "@icons/folder2-open.svg?react";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { useSnapshot } from "valtio";
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
import { deckStore, inventoryStore, sharedStore, useApp } from "@/context";

const InventoryButtons = ({
  setShowAddDeck,
  setShowAddPrecon,
  cryptClan,
  libraryClan,
  type,
  discipline,
  category,
  onlyNotes,
  inShared,
  setShowShareModal,
}) => {
  const {
    preconDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    publicName,
    isDesktop,
    username,
    sharedKey,
  } = useApp();
  const { [CRYPT]: sharedCrypt, [LIBRARY]: sharedLibrary } = useSnapshot(sharedStore);

  const {
    [IS_FROZEN]: isFrozen,
    [CRYPT]: inventoryCrypt,
    [LIBRARY]: inventoryLibrary,
  } = useSnapshot(inventoryStore);
  const decks = useSnapshot(deckStore)[DECKS];
  const navigate = useNavigate();
  const crypt = inShared ? sharedCrypt : inventoryCrypt;
  const library = inShared ? sharedLibrary : inventoryLibrary;

  const handleClose = () => {
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        {username && inShared && (
          <ButtonIconed
            variant={isDesktop ? "secondary" : "primary"}
            onClick={() => {
              setShowMenuButtons(false);
              setShowFloatingButtons(true);
              navigate("/inventory");
            }}
            title="Back to My Inventory"
            icon={<Folder2Open />}
            text="Back to My Inventory"
          />
        )}
        <DeckExportButton
          deck={{
            [NAME]: `Inventory ${format(new Date(), "yyyy-MM-dd")}`,
            [AUTHOR]: publicName,
            [CRYPT]: crypt,
            [LIBRARY]: library,
          }}
          inInventory
        />
        {!inShared && (
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
              cryptClan={cryptClan}
              libraryClan={libraryClan}
              type={type}
              discipline={discipline}
            />
            <InventoryShareButton setShow={setShowShareModal} />
            {!inShared && sharedKey && (
              <ButtonIconed
                variant={isDesktop ? "secondary" : "primary"}
                onClick={() => {
                  setShowMenuButtons(false);
                  setShowFloatingButtons(true);
                  navigate(`/inventory?key=${sharedKey}`);
                }}
                title="Open Shared Inventory"
                icon={<Folder2Open />}
                text="Open Shared Inventory"
              />
            )}
          </>
        )}
      </div>
      <ButtonFloatClose className="lg:hidden" handleClose={handleClose} />
    </>
  );
};

export default InventoryButtons;
