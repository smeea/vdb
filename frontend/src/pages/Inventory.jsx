import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';
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
} from '@/components';
import { ALL, CRYPT, LIBRARY } from '@/constants';
import { useApp } from '@/context';
import { inventoryServices, storageServices } from '@/services';

const INVENTORY_CATEGORY = 'inventoryCategory';

const Inventory = () => {
  const {
    inventoryMode,
    setInventoryMode,
    username,
    isMobile,
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
  const sharedKey = searchParams.get('key');
  const [sharedCrypt, setSharedCrypt] = useState();
  const [sharedLibrary, setSharedLibrary] = useState();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCryptOnMobile, setShowCryptOnMobile] = useState(true);
  const isSharedInventory = sharedCrypt && sharedLibrary;

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
          setInventoryError('NO INVENTORY WITH THIS KEY');
          break;
        default:
          setInventoryError('CONNECTION PROBLEM');
      }
      return;
    }
    setSharedCrypt(response[CRYPT]);
    setSharedLibrary(response[LIBRARY]);
  };

  useEffect(() => {
    if (sharedKey && !isSharedInventory && cryptCardBase && libraryCardBase) {
      getInventory(sharedKey);
    }
  }, [sharedKey, cryptCardBase, libraryCardBase]);

  const [category, setCategory] = useState(
    storageServices.getLocalStorage(INVENTORY_CATEGORY) || ALL,
  );
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [showAddPrecon, setShowAddPrecon] = useState(false);
  const [clan, setClan] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [discipline, setDiscipline] = useState(ALL);
  const [onlyNotes, setOnlyNotes] = useState(false);

  const handleClose = () => {
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const handleSetCategory = (value) => {
    setCategory(value);
    storageServices.setLocalStorage(INVENTORY_CATEGORY, value);
  };

  return (
    <div className="inventory-container mx-auto">
      {(!sharedKey && username) || isSharedInventory ? (
        <FlexGapped>
          <div
            className={twMerge(
              showCryptOnMobile ? 'flex' : 'hidden',
              'basis-full flex-col sm:flex sm:basis-5/9 sm:gap-2 lg:gap-3 xl:gap-4',
            )}
          >
            <InventoryCryptWrapper
              sharedCrypt={sharedCrypt}
              category={category}
              onlyNotes={onlyNotes}
              clan={clan}
              setClan={setClan}
            />
          </div>
          <div
            className={twMerge(
              showCryptOnMobile ? 'hidden' : 'flex',
              'basis-full flex-col sm:flex sm:basis-4/9 sm:gap-2 lg:gap-3 xl:gap-4',
            )}
          >
            <InventoryLibraryWrapper
              sharedLibrary={sharedLibrary}
              category={category}
              onlyNotes={onlyNotes}
              discipline={discipline}
              setDiscipline={setDiscipline}
              type={type}
              setType={setType}
            />
          </div>
          <div className="min-w-[180px] max-lg:hidden">
            <InventoryMenu
              category={category}
              clan={clan}
              discipline={discipline}
              isSharedInventory={isSharedInventory}
              onlyNotes={onlyNotes}
              setCategory={handleSetCategory}
              setOnlyNotes={setOnlyNotes}
              setSharedCrypt={setSharedCrypt}
              setSharedLibrary={setSharedLibrary}
              setShowAddDeck={setShowAddDeck}
              setShowAddPrecon={setShowAddPrecon}
              setShowShareModal={setShowShareModal}
              sharedCrypt={sharedCrypt}
              sharedLibrary={sharedLibrary}
              type={type}
            />
          </div>
          {isMobile && showFloatingButtons && (
            <ButtonFloat onClick={() => setShowCryptOnMobile(!showCryptOnMobile)} position="middle">
              <div className="text-2xl">{showCryptOnMobile ? 'LIB' : 'CR'}</div>
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
      {showMenuButtons && (
        <Modal handleClose={handleClose} centered size="xs" withMobileMargin noClose={!isDesktop}>
          <InventoryMenu
            category={category}
            clan={clan}
            discipline={discipline}
            isSharedInventory={isSharedInventory}
            onlyNotes={onlyNotes}
            setCategory={handleSetCategory}
            setOnlyNotes={setOnlyNotes}
            setSharedCrypt={setSharedCrypt}
            setSharedLibrary={setSharedLibrary}
            setShowAddDeck={setShowAddDeck}
            setShowAddPrecon={setShowAddPrecon}
            setShowShareModal={setShowShareModal}
            sharedCrypt={sharedCrypt}
            sharedLibrary={sharedLibrary}
            type={type}
          />
          <div className="lg:hidden">
            <ButtonFloatClose handleClose={handleClose} />
          </div>
        </Modal>
      )}
      {showAddDeck && (
        <InventoryAddDeckModal
          handleClose={() => {
            setShowAddDeck(false);
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
        />
      )}
      {showAddPrecon && (
        <InventoryAddPreconModal
          handleClose={() => {
            setShowAddPrecon(false);
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
        />
      )}
      {showShareModal && <InventoryShareModal show={showShareModal} setShow={setShowShareModal} />}
    </div>
  );
};

export default Inventory;
