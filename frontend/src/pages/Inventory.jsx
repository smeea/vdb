import React, { useEffect, useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { useLocation } from 'react-router-dom';
import List from 'assets/images/icons/list.svg';
import {
  AccountLogin,
  AccountRegister,
  InventoryAddDeckModal,
  InventoryAddPreconModal,
  InventoryDesktop,
  InventoryMobile,
  InventoryButtons,
  InventoryShowSelect,
  InventoryShareModal,
  Modal,
  ButtonFloat,
} from 'components';
import { useApp, inventoryStore } from 'context';

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
    const url = `${process.env.API_URL}inventory/${key}`;
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

  const [missingByClan, setMissingByClan] = useState();
  const [missingByType, setMissingByType] = useState();
  const [missingByDiscipline, setMissingByDiscipline] = useState();

  const newCryptFocus = () => newCryptRef.current.focus();
  const newCryptRef = useRef();
  const newLibraryFocus = () => newLibraryRef.current.focus();
  const newLibraryRef = useRef();

  const X_SPACING = 'space-x-8';
  const TOP_SPACING = 'pt-8';

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
              missingByClan={missingByClan}
              missingByType={missingByType}
              missingByDiscipline={missingByDiscipline}
              setMissingByClan={setMissingByClan}
              setMissingByType={setMissingByType}
              setMissingByDiscipline={setMissingByDiscipline}
              category={category}
              setCategory={setCategory}
              setShowAddDeck={setShowAddDeck}
              setShowAddPrecon={setShowAddPrecon}
              sharedInventoryCrypt={sharedInventoryCrypt}
              sharedInventoryLibrary={sharedInventoryLibrary}
              inShared={inventoryKey ? true : false}
            />
          ) : (
            <div className={`flex flex-row ${X_SPACING} ${TOP_SPACING}`}>
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
                missingByClan={missingByClan}
                missingByType={missingByType}
                missingByDiscipline={missingByDiscipline}
                setMissingByClan={setMissingByClan}
                setMissingByType={setMissingByType}
                setMissingByDiscipline={setMissingByDiscipline}
                category={category}
                setCategory={setCategory}
                setShowAddDeck={setShowAddDeck}
                setShowAddPrecon={setShowAddPrecon}
                setShowShareModal={setShowShareModal}
                sharedInventoryCrypt={sharedInventoryCrypt}
                sharedInventoryLibrary={sharedInventoryLibrary}
                setInventoryKey={setInventoryKey}
                inShared={inventoryKey ? true : false}
              />
            </div>
          )}
        </>
      ) : (
        <>
          {inventoryError ? (
            <div className=" flex flex-row items-center justify-center">
              <div className="basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2">
                <div className="error-message flex items-center justify-center font-bold">
                  {inventoryError}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[70vh] flex-col items-center justify-center space-y-10">
              <div className="flex text-blue justify-center font-bold text-lg">
                Login to manage your inventory
              </div>
              <div className="space-y-16">
                <AccountLogin />
                <AccountRegister />
              </div>
            </div>
          )}
        </>
      )}
      {showFloatingButtons && (
        <ButtonFloat
          onClick={() => {
            setShowMenuButtons(true);
            setShowFloatingButtons(false);
          }}
          variant="lg:hidden float-menu"
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
          <div className="z-20 sticky top-[77px] space-y-3">
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
              missingByClan={missingByClan}
              missingByType={missingByType}
              missingByDiscipline={missingByDiscipline}
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
          show={showAddDeck}
          handleClose={() => {
            setShowAddDeck(false);
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
        />
      )}
      {showAddPrecon && (
        <InventoryAddPreconModal
          show={showAddPrecon}
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
