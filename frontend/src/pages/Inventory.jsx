import React, { useEffect, useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { useLocation } from 'react-router-dom';
import { Col, Modal } from 'react-bootstrap';
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

  const [newCryptId, setNewCryptId] = useState(undefined);
  const [newLibraryId, setNewLibraryId] = useState(undefined);
  const [category, setCategory] = useState('all');
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [showAddPrecon, setShowAddPrecon] = useState(false);
  const [clan, setClan] = useState('All');
  const [type, setType] = useState('All');
  const [discipline, setDiscipline] = useState('All');

  const [missingByClan, setMissingByClan] = useState(undefined);
  const [missingByType, setMissingByType] = useState(undefined);
  const [missingByDiscipline, setMissingByDiscipline] = useState(undefined);

  const newCryptFocus = () => newCryptRef.current.focus();
  const newCryptRef = useRef(null);
  const newLibraryFocus = () => newLibraryRef.current.focus();
  const newLibraryRef = useRef(null);

  return (
    <div className="search-container mx-auto p-0">
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
            <div className="flex flex-row mx-0">
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
            <div className="flex flex-row items-center justify-center p-0 p-md-3">
              <Col xs={12} md={8} lg={7} xl={6}>
                <div className="flex items-center justify-center error-message p-2">
                  <b>{inventoryError}</b>
                </div>
              </Col>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center pt-3 mx-0 h-[80vh]">
              <Col xs={12} md={8} lg={7} xl={6} className="px-3">
                <div className="flex justify-center">
                  <h6>Login required to manage inventory</h6>
                </div>
                <div className="py-4">
                  <AccountLogin />
                </div>
                <div className="py-4">
                  <AccountRegister />
                </div>
              </Col>
            </div>
          )}
        </>
      )}
      {showFloatingButtons && (
        <div
          onClick={() => {
            setShowMenuButtons(true);
            setShowFloatingButtons(false);
          }}
          className="hide-on-gt1200px flex float-right-bottom float-menu items-center justify-center"
        >
          <List viewBox="0 0 16 16" />
        </div>
      )}
      {showMenuButtons && (
        <Modal
          show={showMenuButtons}
          onHide={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          animation={false}
          centered={true}
          size="sm"
        >
          <Modal.Body className="p-1">
            <div className="px-0">
              <InventoryButtons
                crypt={
                  sharedInventoryCrypt ? sharedInventoryCrypt : inventoryCrypt
                }
                library={
                  sharedInventoryCrypt
                    ? sharedInventoryLibrary
                    : inventoryLibrary
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
              <div className="px-4 pt-2">
                <InventoryShowSelect
                  category={category}
                  setCategory={setCategory}
                />
              </div>
            </div>
          </Modal.Body>
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
