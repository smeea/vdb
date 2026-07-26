import { Activity, useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";
import {
  ButtonFloat,
  ButtonFloatClose,
  ButtonFloatMenu,
  ErrorMessage,
  FlexGapped,
  InventoryAddDeckModal,
  InventoryAddPreconModal,
  InventoryCryptWrapper,
  InventoryLibraryWrapper,
  InventoryMenu,
  InventoryShareModal,
  LoginBlock,
  Modal,
} from "@/components";
import { ALL, CRYPT, LIBRARY } from "@/constants";
import { sharedStore, useApp } from "@/context";
import { inventoryServices, storageServices } from "@/services";

const INVENTORY_CATEGORY = "inventoryCategory";

const Inventory = () => {
  const {
    inventoryMode,
    setInventoryMode,
    username,
    isDesktop,
    showMenuButtons,
    setShowMenuButtons,
    showFloatingButtons,
    setShowFloatingButtons,
    cryptCardBase,
    libraryCardBase,
  } = useApp();

  const [inventoryError, setInventoryError] = useState();
  const [searchParams] = useSearchParams();
  const sharedKey = searchParams.get("key");
  const { [CRYPT]: sharedCrypt, [LIBRARY]: sharedLibrary } = useSnapshot(sharedStore);

  const [showShareModal, setShowShareModal] = useState(false);
  const [showCryptOnMobile, setShowCryptOnMobile] = useState(true);

  useEffect(() => {
    if (!inventoryMode) setInventoryMode(true);
  }, [inventoryMode]);

  const getInventory = async (key) => {
    setInventoryError(false);
    let response;
    try {
      response = await inventoryServices.getSharedInventory(key, cryptCardBase, libraryCardBase);
    } catch (e) {
      switch (e.response.status) {
      case 401:
        setInventoryError("NO INVENTORY WITH THIS KEY");
        break;
      default:
        setInventoryError("CONNECTION PROBLEM");
      }
      return;
    }

    sharedStore[CRYPT] = response[CRYPT];
    sharedStore[LIBRARY] = response[LIBRARY];
  };

  useEffect(() => {
    if (sharedKey && !(sharedCrypt && sharedLibrary) && cryptCardBase && libraryCardBase) {
      getInventory(sharedKey);
    }
  }, [sharedKey, cryptCardBase, libraryCardBase]);

  const [category, setCategory] = useState(
    storageServices.getLocalStorage(INVENTORY_CATEGORY) || ALL,
  );
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [showAddPrecon, setShowAddPrecon] = useState(false);
  const [cryptClan, setCryptClan] = useState(ALL);
  const [libraryClan, setLibraryClan] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [discipline, setDiscipline] = useState(ALL);
  const [onlyNotes, setOnlyNotes] = useState(false);

  const handleClose = () => {
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const handleCloseAddDeck = () => {
    setShowAddDeck(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const handleCloseAddPrecon = () => {
    setShowAddPrecon(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const handleSetCategory = (value) => {
    setCategory(value);
    storageServices.setLocalStorage(INVENTORY_CATEGORY, value);
  };

  return (
    <div className="inventory-container mx-auto">
      {(!sharedKey && username) || (sharedCrypt && sharedLibrary) ? (
        <FlexGapped>
          <div
            className={twMerge(
              showCryptOnMobile ? "flex" : "hidden",
              "basis-full flex-col sm:flex sm:basis-5/9 sm:gap-2 lg:gap-3 xl:gap-4",
            )}
          >
            <InventoryCryptWrapper
              inShared={!!sharedKey}
              category={category}
              onlyNotes={onlyNotes}
              clan={cryptClan}
              setClan={setCryptClan}
            />
          </div>
          <div
            className={twMerge(
              showCryptOnMobile ? "hidden" : "flex",
              "basis-full flex-col sm:flex sm:basis-4/9 sm:gap-2 lg:gap-3 xl:gap-4",
            )}
          >
            <InventoryLibraryWrapper
              inShared={!!sharedKey}
              category={category}
              onlyNotes={onlyNotes}
              discipline={discipline}
              setDiscipline={setDiscipline}
              type={type}
              setType={setType}
              clan={libraryClan}
              setClan={setLibraryClan}
            />
          </div>
          <div className="min-w-[180px] max-lg:hidden">
            <InventoryMenu
              category={category}
              cryptClan={cryptClan}
              libraryClan={libraryClan}
              discipline={discipline}
              inShared={!!sharedKey}
              onlyNotes={onlyNotes}
              setCategory={handleSetCategory}
              setOnlyNotes={setOnlyNotes}
              setShowAddDeck={setShowAddDeck}
              setShowAddPrecon={setShowAddPrecon}
              setShowShareModal={setShowShareModal}
              type={type}
            />
          </div>
          {showFloatingButtons && (
            <ButtonFloat
              className="sm:hidden"
              onClick={() => setShowCryptOnMobile(!showCryptOnMobile)}
              position="middle"
            >
              <div className="text-2xl">{showCryptOnMobile ? "LIB" : "CR"}</div>
            </ButtonFloat>
          )}
        </FlexGapped>
      ) : inventoryError ? (
        <ErrorMessage>{inventoryError}</ErrorMessage>
      ) : (
        <div className="flex min-h-[80vh] place-items-center max-sm:px-2">
          <LoginBlock>Login to manage your inventory</LoginBlock>
        </div>
      )}
      <div className="lg:hidden">
        <ButtonFloatMenu />
      </div>
      <Activity mode={showMenuButtons ? "visible" : "hidden"}>
        <Modal handleClose={handleClose} centered size="xs" withMobileMargin noClose={!isDesktop}>
          <InventoryMenu
            category={category}
            cryptClan={cryptClan}
            libraryClan={libraryClan}
            discipline={discipline}
            inShared={!!sharedKey}
            onlyNotes={onlyNotes}
            setCategory={handleSetCategory}
            setOnlyNotes={setOnlyNotes}
            setShowAddDeck={setShowAddDeck}
            setShowAddPrecon={setShowAddPrecon}
            setShowShareModal={setShowShareModal}
            type={type}
          />
          <div className="lg:hidden">
            <ButtonFloatClose handleClose={handleClose} />
          </div>
        </Modal>
      </Activity>
      <Activity mode={showAddDeck ? "visible" : "hidden"}>
        <InventoryAddDeckModal handleClose={handleCloseAddDeck} />
      </Activity>
      <Activity mode={showAddPrecon ? "visible" : "hidden"}>
        <InventoryAddPreconModal handleClose={handleCloseAddPrecon} />
      </Activity>
      {showShareModal && <InventoryShareModal show={showShareModal} setShow={setShowShareModal} />}
    </div>
  );
};

export default Inventory;
