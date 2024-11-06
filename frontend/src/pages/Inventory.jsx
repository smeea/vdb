import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useLocation } from 'react-router-dom';
import {
  LoginBlock,
  InventoryAddDeckModal,
  InventoryAddPreconModal,
  InventoryCryptWrapper,
  InventoryLibraryWrapper,
  InventoryMenu,
  InventoryShareModal,
  Modal,
  ButtonFloat,
  ButtonFloatMenu,
  ButtonFloatClose,
  ErrorMessage,
  FlexGapped,
} from '@/components';
import { useApp } from '@/context';
import { inventoryServices } from '@/services';
import { ALL } from '@/constants';

const Inventory = () => {
  const {
    inventoryMode,
    setInventoryMode,
    username,
    isMobile,
    showMenuButtons,
    setShowMenuButtons,
    showFloatingButtons,
    setShowFloatingButtons,
    cryptCardBase,
    libraryCardBase,
  } = useApp();

  const [inventoryError, setInventoryError] = useState();
  const query = new URLSearchParams(useLocation().search);
  const sharedKey = query.get('key');
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
      getInventory(query.get('key'));
    }
  }, [sharedKey, cryptCardBase, libraryCardBase]);

  const [category, setCategory] = useState(ALL);
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
              setCategory={setCategory}
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
              <div className="text-[28px]">{showCryptOnMobile ? 'LIB' : 'CR'}</div>
            </ButtonFloat>
          )}
        </FlexGapped>
      ) : inventoryError ? (
        <ErrorMessage>{inventoryError}</ErrorMessage>
      ) : (
        <div className="grid h-[80vh] place-items-center max-sm:px-2">
          <LoginBlock>Login to manage your inventory</LoginBlock>
        </div>
      )}
      <div className="lg:hidden">
        <ButtonFloatMenu />
      </div>
      {showMenuButtons && (
        <Modal handleClose={handleClose} centered size="sm" withMobileMargin>
          <InventoryMenu
            category={category}
            clan={clan}
            discipline={discipline}
            isSharedInventory={isSharedInventory}
            onlyNotes={onlyNotes}
            setCategory={setCategory}
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
