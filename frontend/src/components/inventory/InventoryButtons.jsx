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
import { useApp, deckStore } from '@/context';

const InventoryButtons = ({
  setShowAddDeck,
  setShowAddPrecon,
  clan,
  type,
  discipline,
  category,
  onlyNotes,
  crypt,
  library,
  setShowShareModal,
  inShared,
  setSharedInventoryCrypt,
  setSharedInventoryLibrary,
}) => {
  const {
    preconDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    publicName,
    isNarrow,
    isDesktop,
  } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const navigate = useNavigate();

  const handleClose = () => {
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <div className="flex flex-col space-y-1">
        {inShared && (
          <ButtonIconed
            variant={isDesktop ? 'secondary' : 'primary'}
            onClick={() => {
              setShowMenuButtons(false);
              setShowFloatingButtons(true);
              setSharedInventoryCrypt(null);
              setSharedInventoryLibrary(null);
              navigate('/inventory');
            }}
            title="Back to My Inventory"
            icon={<Folder2Open />}
            text="Back to My Inventory"
          />
        )}
        <DeckExportButton
          deck={{
            name: `Inventory ${new Date().toISOString().split('T')[0]}`,
            author: publicName,
            crypt: crypt,
            library: library,
          }}
          inInventory
        />
        {!inShared && (
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
