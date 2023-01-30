import React, { useEffect, useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { useLocation } from 'react-router-dom';
import List from '@/assets/images/icons/list.svg';
import {
  LoginBlock,
  InventoryAddDeckModal,
  InventoryAddPreconModal,
  InventoryDesktop,
  InventoryMobile,
  InventoryButtons,
  InventoryShowSelect,
  InventoryShareModal,
  Modal,
  ButtonFloat,
  ErrorMessage,
} from '@/components';
import { useApp, inventoryStore } from '@/context';

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

  const [inventoryError, setInventoryError] = useState();
  const [inventoryKey, setInventoryKey] = useState();
  const query = new URLSearchParams(useLocation().search);
  const [sharedInventoryCrypt, setSharedInventoryCrypt] = useState();
  const [sharedInventoryLibrary, setSharedInventoryLibrary] = useState();
  const [showShareModal, setShowShareModal] = useState(false);

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
  const [missingLibraryByDiscipline, setMissingLibraryByDiscipline] = useState();

  const newCryptFocus = () => newCryptRef.current.focus();
  const newCryptRef = useRef();
  const newLibraryFocus = () => newLibraryRef.current.focus();
  const newLibraryRef = useRef();

  return (
    <div className="search-container mx-auto">
      {(!inventoryKey && username) || (inventoryKey && !inventoryError) ? (
        <>
          {isMobile ? (
            <InventoryMobile
              newCryptId={newCryptId}
              newLibraryId={newLibraryId}
              setNewCryptId={setNewCryptId}
              setNewLibraryId={setNewLibraryId}
              newCryptRef={newCryptRef}
              newLibraryRef={newLibraryRef}
              newCryptFocus={newCryptFocus}
              newLibraryFocus={newLibraryFocus}
              clan={clan}
              type={type}
              discipline={discipline}
              setClan={setClan}
              setType={setType}
              setDiscipline={setDiscipline}
              setMissingCryptByClan={setMissingCryptByClan}
              setMissingLibraryByType={setMissingLibraryByType}
              setMissingLibraryByDiscipline={setMissingLibraryByDiscipline}
              category={category}
              setCategory={setCategory}
              setShowAddDeck={setShowAddDeck}
              setShowAddPrecon={setShowAddPrecon}
              sharedInventoryCrypt={sharedInventoryCrypt}
              sharedInventoryLibrary={sharedInventoryLibrary}
              inShared={Boolean(inventoryKey)}
            />
          ) : (
            <InventoryDesktop
              newCryptId={newCryptId}
              newLibraryId={newLibraryId}
              setNewCryptId={setNewCryptId}
              setNewLibraryId={setNewLibraryId}
              newCryptRef={newCryptRef}
              newLibraryRef={newLibraryRef}
              newCryptFocus={newCryptFocus}
              newLibraryFocus={newLibraryFocus}
              clan={clan}
              type={type}
              discipline={discipline}
              setClan={setClan}
              setType={setType}
              setDiscipline={setDiscipline}
              missingCryptByClan={missingCryptByClan}
              missingLibraryByType={missingLibraryByType}
              missingLibraryByDiscipline={missingLibraryByDiscipline}
              setMissingCryptByClan={setMissingCryptByClan}
              setMissingLibraryByType={setMissingLibraryByType}
              setMissingLibraryByDiscipline={setMissingLibraryByDiscipline}
              category={category}
              setCategory={setCategory}
              setShowAddDeck={setShowAddDeck}
              setShowAddPrecon={setShowAddPrecon}
              setShowShareModal={setShowShareModal}
              sharedInventoryCrypt={sharedInventoryCrypt}
              sharedInventoryLibrary={sharedInventoryLibrary}
              setInventoryKey={setInventoryKey}
              inShared={Boolean(inventoryKey)}
            />
          )}
        </>
      ) : (
        <>
          {inventoryError && <ErrorMessage>{inventoryError}</ErrorMessage>}
          {!inventoryError && username === null && (
            <LoginBlock>
              <div className="flex justify-center text-xl">
                Login to manage your inventory
              </div>
            </LoginBlock>
          )}
        </>
      )}
      {showFloatingButtons && (
        <ButtonFloat
          className="lg:hidden"
          onClick={() => {
            setShowMenuButtons(true);
            setShowFloatingButtons(false);
          }}
          variant="primary"
        >
          <List width="35" height="35" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
      {showMenuButtons && (
        <Modal
          handleClose={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          centered
          size="sm"
        >
          <div className="top-[77px] z-20 space-y-3 bg-bgPrimary dark:bg-bgPrimaryDark">
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
              inShared={inventoryKey ? true : false}
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
