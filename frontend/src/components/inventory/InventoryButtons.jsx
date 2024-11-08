import React from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import Folder2Open from '@/assets/images/icons/folder2-open.svg?react';
import {
  InventoryImport,
  DeckExportButton,
  InventoryDeleteButton,
  InventoryMissingButton,
  InventoryShareButton,
  ButtonIconed,
  ButtonFloatClose,
} from '@/components';
import FolderPlus from '@/assets/images/icons/folder-plus.svg?react';
import { useApp, deckStore, inventoryStore } from '@/context';
import { NAME, AUTHOR, CRYPT, LIBRARY, DECKS, IS_FROZEN } from '@/constants';

const InventoryButtons = ({
  setShowAddDeck,
  setShowAddPrecon,
  clan,
  type,
  discipline,
  category,
  onlyNotes,
  isSharedInventory,
  sharedCrypt,
  sharedLibrary,
  setSharedCrypt,
  setSharedLibrary,
  setShowShareModal,
}) => {
  const {
    preconDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    publicName,
    isNarrow,
    isDesktop,
  } = useApp();

  const {
    [IS_FROZEN]: isFrozen,
    [CRYPT]: inventoryCrypt,
    [LIBRARY]: inventoryLibrary,
  } = useSnapshot(inventoryStore);
  const decks = useSnapshot(deckStore)[DECKS];
  const navigate = useNavigate();
  const crypt = isSharedInventory ? sharedCrypt : inventoryCrypt;
  const library = isSharedInventory ? sharedLibrary : inventoryLibrary;

  const handleClose = () => {
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        {isSharedInventory && (
          <ButtonIconed
            variant={isDesktop ? 'secondary' : 'primary'}
            onClick={() => {
              setShowMenuButtons(false);
              setShowFloatingButtons(true);
              setSharedCrypt(null);
              setSharedLibrary(null);
              navigate('/inventory');
            }}
            title="Back to My Inventory"
            icon={<Folder2Open />}
            text="Back to My Inventory"
          />
        )}
        <DeckExportButton
          deck={{
            [NAME]: `Inventory ${new Date().toISOString().split('T')[0]}`,
            [AUTHOR]: publicName,
            [CRYPT]: crypt,
            [LIBRARY]: library,
          }}
          inInventory
        />
        {!isSharedInventory && (
          <>
            {!isFrozen && (
              <>
                <InventoryImport />
                {decks && (
                  <ButtonIconed
                    variant={isDesktop ? 'secondary' : 'primary'}
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
                    variant={isDesktop ? 'secondary' : 'primary'}
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
              clan={clan}
              type={type}
              discipline={discipline}
            />
            <InventoryShareButton setShow={setShowShareModal} />
          </>
        )}
      </div>
      {isNarrow && <ButtonFloatClose handleClose={handleClose} />}
    </>
  );
};

export default InventoryButtons;
