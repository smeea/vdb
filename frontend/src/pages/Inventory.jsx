import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  LoginBlock,
  InventoryAddDeckModal,
  InventoryAddPreconModal,
  InventoryCryptWrapper,
  InventoryLibraryWrapper,
  InventoryButtons,
  InventoryShowSelect,
  InventoryShareModal,
  Modal,
  ButtonFloat,
  ButtonFloatMenu,
  ErrorMessage,
  Checkbox,
  FlexGapped,
} from '@/components';
import { useApp } from '@/context';

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
  const [sharedCrypt, setSharedCrypt] = useState();
  const [sharedLibrary, setSharedLibrary] = useState();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCryptOnMobile, setShowCryptOnMobile] = useState(true);
  const inShared = sharedCrypt && sharedLibrary;

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
        Object.keys(data.crypt).forEach((k) => {
          crypt[k] = { ...data.crypt[k], c: cryptCardBase[k] };
        });
        Object.keys(data.library).forEach((k) => {
          library[k] = { ...data.library[k], c: libraryCardBase[k] };
        });
        setSharedCrypt(crypt);
        setSharedLibrary(library);
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
    if (query.get('key') && !inShared && cryptCardBase && libraryCardBase) {
      getInventory(query.get('key'));
    }
  }, [query, cryptCardBase, libraryCardBase]);

  const [category, setCategory] = useState('all');
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [showAddPrecon, setShowAddPrecon] = useState(false);
  const [clan, setClan] = useState('All');
  const [type, setType] = useState('All');
  const [discipline, setDiscipline] = useState('All');
  const [onlyNotes, setOnlyNotes] = useState(false);

  return (
    <div className="inventory-container mx-auto">
      {(!inShared && username) || (inShared && !inventoryError) ? (
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
          <div className="flex basis-full flex-col space-y-6 max-lg:hidden lg:basis-2/12">
            <InventoryButtons
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
              category={inShared ? 'ok' : category}
              onlyNotes={onlyNotes}
            />
            <div>
              <InventoryShowSelect
                category={category}
                setCategory={setCategory}
              />
            </div>
            <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">
              <Checkbox
                label="Only with Notes"
                checked={onlyNotes}
                onChange={() => setOnlyNotes(!onlyNotes)}
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
          <div className="space-y-3">
            <InventoryButtons
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
              category={inShared ? 'ok' : category}
              onlyNotes={onlyNotes}
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
