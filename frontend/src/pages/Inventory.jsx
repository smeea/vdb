import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
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
  ErrorMessage,
  Checkbox,
  FlexGapped,
} from '@/components';
import { inventoryStore, useApp } from '@/context';
import { inventoryServices } from '@/services';
import { ALL, OK } from '@/utils/constants';

const Inventory = () => {
  const {
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
    setSharedCrypt(response.crypt);
    setSharedLibrary(response.library);
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

  return (
    <div className="inventory-container mx-auto">
      {(!sharedKey && username) || isSharedInventory ? (
        <FlexGapped>
          <div
            className={`${
              showCryptOnMobile ? 'flex' : 'hidden'
            } basis-full flex-col sm:flex sm:basis-5/9 sm:gap-2 lg:gap-3 xl:gap-4`}
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
            className={`${
              showCryptOnMobile ? 'hidden' : 'flex'
            } basis-full flex-col sm:flex sm:basis-4/9 sm:gap-2 lg:gap-3 xl:gap-4`}
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
          <div className="max-lg:hidden lg:basis-2/12">
            <InventoryMenu
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
              category={category}
              onlyNotes={onlyNotes}
              setOnlyNotes={setOnlyNotes}
              isSharedInventory={isSharedInventory}
            />
          </div>
          {isMobile && showFloatingButtons && (
            <ButtonFloat
              onClick={() => setShowCryptOnMobile(!showCryptOnMobile)}
              position="middle"
              variant="primary"
            >
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
      <ButtonFloatMenu />
      {showMenuButtons && (
        <Modal
          handleClose={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          centered
          size="sm"
        >
          <InventoryMenu
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
            category={category}
            setCategory={setCategory}
            onlyNotes={onlyNotes}
            setOnlyNotes={setOnlyNotes}
          />
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
