import React, { useEffect, useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { useLocation } from 'react-router-dom';
import {
  LoginBlock,
  InventoryAddDeckModal,
  InventoryAddPreconModal,
  NewCryptCard,
  NewLibraryCard,
  InventoryCrypt,
  InventoryLibrary,
  InventoryButtons,
  InventoryShowSelect,
  InventoryShareModal,
  Modal,
  ButtonFloat,
  ButtonFloatMenu,
  ErrorMessage,
} from '@/components';
import { useApp, inventoryStore, usedStore } from '@/context';

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
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const usedLibrary = useSnapshot(usedStore).library;

  const [inventoryError, setInventoryError] = useState();
  const [inventoryKey, setInventoryKey] = useState();
  const query = new URLSearchParams(useLocation().search);
  const [sharedInventoryCrypt, setSharedInventoryCrypt] = useState();
  const [sharedInventoryLibrary, setSharedInventoryLibrary] = useState();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCryptOnMobile, setShowCryptOnMobile] = useState(true);

  const getInventory = (key) => {
    const url = `${import.meta.env.VITE_API_URL}/inventory/${key}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    setInventoryError(false);
    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((data) => {
        const crypt = {};
        const library = {};
        Object.keys(data.crypt).map((k) => {
          crypt[k] = { ...data.crypt[k], c: cryptCardBase[k] };
        });
        Object.keys(data.library).map((k) => {
          library[k] = { ...data.library[k], c: libraryCardBase[k] };
        });
        setSharedInventoryCrypt(crypt);
        setSharedInventoryLibrary(library);
      })
      .catch((error) => {
        if (error.message == 401) {
          setInventoryError('NO INVENTORY WITH THIS KEY');
        } else {
          setInventoryError('CONNECTION PROBLEM');
        }
      });
  };

  useEffect(() => {
    if (query.get('key')) setInventoryKey(query.get('key'));
  }, [query]);

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      if (inventoryKey) {
        getInventory(inventoryKey);
      } else {
        setSharedInventoryCrypt(undefined);
        setSharedInventoryLibrary(undefined);
      }
    }
  }, [inventoryKey, cryptCardBase, libraryCardBase]);

  const [newCryptId, setNewCryptId] = useState();
  const [newLibraryId, setNewLibraryId] = useState();
  const [category, setCategory] = useState('all');
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [showAddPrecon, setShowAddPrecon] = useState(false);
  const [clan, setClan] = useState('All');
  const [type, setType] = useState('All');
  const [discipline, setDiscipline] = useState('All');

  const [missingCryptByClan, setMissingCryptByClan] = useState();
  const [missingLibraryByType, setMissingLibraryByType] = useState();
  const [missingLibraryByDiscipline, setMissingLibraryByDiscipline] =
    useState();

  const newCryptFocus = () => newCryptRef.current.focus();
  const newCryptRef = useRef();
  const newLibraryFocus = () => newLibraryRef.current.focus();
  const newLibraryRef = useRef();

  const inShared = !!inventoryKey;

  const handleNewCard = (event) => {
    if (event.value > 200000) {
      setNewCryptId(event.value);
    } else {
      setNewLibraryId(event.value);
    }
  };

  return (
    <div className="inventory-container mx-auto">
      {(!inShared && username) || (inShared && !inventoryError) ? (
        <div className="flex sm:gap-4 lg:gap-6 xl:gap-8">
          <div className="max-xl:hidden xl:basis-1/12" />
          <div
            className={`${
              showCryptOnMobile ? 'flex' : 'hidden'
            } basis-full flex-col sm:flex sm:basis-5/9 sm:gap-2 lg:gap-3 xl:gap-4`}
          >
            {!inShared && (
              <>
                <div className="p-2 sm:p-0">
                  <NewCryptCard
                    onChange={handleNewCard}
                    ref={newCryptRef}
                    inInventory
                  />
                </div>
                {newCryptId && (
                  <InventoryCrypt
                    cards={{
                      [newCryptId]: inventoryCrypt[newCryptId]
                        ? inventoryCrypt[newCryptId]
                        : { c: cryptCardBase[newCryptId], q: 0 },
                    }}
                    newFocus={newCryptFocus}
                    compact
                  />
                )}
              </>
            )}
            {inventoryCrypt && (usedCrypt.soft || usedCrypt.hard) && (
              <div>
                <InventoryCrypt
                  withCompact={newCryptId}
                  category={sharedInventoryCrypt ? 'ok' : category}
                  cards={
                    sharedInventoryCrypt ? sharedInventoryCrypt : inventoryCrypt
                  }
                  clan={clan}
                  setClan={setClan}
                  setMissingCryptByClan={setMissingCryptByClan}
                  inShared={inShared}
                />
              </div>
            )}
          </div>
          <div
            className={`${
              showCryptOnMobile ? 'hidden' : 'flex'
            } basis-full flex-col sm:flex sm:basis-4/9 sm:gap-2 lg:gap-3 xl:gap-4`}
          >
            {!inShared && (
              <>
                <div className="p-2 sm:p-0">
                  <NewLibraryCard
                    onChange={handleNewCard}
                    ref={newLibraryRef}
                    inInventory
                  />
                </div>
                {newLibraryId && (
                  <InventoryLibrary
                    cards={{
                      [newLibraryId]: inventoryLibrary[newLibraryId]
                        ? inventoryLibrary[newLibraryId]
                        : { c: libraryCardBase[newLibraryId], q: 0 },
                    }}
                    newFocus={newLibraryFocus}
                    compact
                  />
                )}
              </>
            )}
            {inventoryLibrary && (usedLibrary.soft || usedLibrary.hard) && (
              <div>
                <InventoryLibrary
                  withCompact={newLibraryId}
                  category={sharedInventoryLibrary ? 'ok' : category}
                  cards={
                    sharedInventoryLibrary
                      ? sharedInventoryLibrary
                      : inventoryLibrary
                  }
                  type={type}
                  setType={setType}
                  discipline={discipline}
                  setDiscipline={setDiscipline}
                  setMissingLibraryByType={setMissingLibraryByType}
                  setMissingLibraryByDiscipline={setMissingLibraryByDiscipline}
                  inShared={inShared}
                />
              </div>
            )}
          </div>
          <div className="flex basis-full flex-col space-y-6 max-lg:hidden lg:basis-2/12">
            <InventoryButtons
              crypt={
                sharedInventoryCrypt ? sharedInventoryCrypt : inventoryCrypt
              }
              library={
                sharedInventoryLibrary
                  ? sharedInventoryLibrary
                  : inventoryLibrary
              }
              setShowAddDeck={setShowAddDeck}
              setShowAddPrecon={setShowAddPrecon}
              setShowShareModal={setShowShareModal}
              clan={clan}
              discipline={discipline}
              type={type}
              missingCryptByClan={missingCryptByClan}
              missingLibraryByType={missingLibraryByType}
              missingLibraryByDiscipline={missingLibraryByDiscipline}
              setInventoryKey={setInventoryKey}
              inShared={inShared}
            />
            <div>
              <InventoryShowSelect
                category={category}
                setCategory={setCategory}
              />
            </div>
          </div>
          {isMobile && showFloatingButtons && (
            <ButtonFloat
              onClick={() => setShowCryptOnMobile(!showCryptOnMobile)}
              position="middle"
              variant="primary"
            >
              <div className="text-[28px]">
                {showCryptOnMobile ? 'LIB' : 'CR'}
              </div>
            </ButtonFloat>
          )}
        </div>
      ) : inventoryError ? (
        <ErrorMessage>{inventoryError}</ErrorMessage>
      ) : (
        <LoginBlock>Login to manage your inventory</LoginBlock>
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
          <div className="space-y-3">
            <InventoryButtons
              crypt={
                sharedInventoryCrypt ? sharedInventoryCrypt : inventoryCrypt
              }
              library={
                sharedInventoryCrypt ? sharedInventoryLibrary : inventoryLibrary
              }
              setShowAddDeck={setShowAddDeck}
              setShowAddPrecon={setShowAddPrecon}
              setShowShareModal={setShowShareModal}
              clan={clan}
              discipline={discipline}
              type={type}
              missingCryptByClan={missingCryptByClan}
              missingLibraryByType={missingLibraryByType}
              missingLibraryByDiscipline={missingLibraryByDiscipline}
              setInventoryKey={setInventoryKey}
              inShared={inShared}
            />
            <div>
              <InventoryShowSelect
                category={category}
                setCategory={setCategory}
              />
            </div>
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
      {showShareModal && (
        <InventoryShareModal
          show={showShareModal}
          setShow={setShowShareModal}
        />
      )}
    </div>
  );
};

export default Inventory;
