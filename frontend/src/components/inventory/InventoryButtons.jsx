import React from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import { Stack } from 'react-bootstrap';
import Folder2Open from 'assets/images/icons/folder2-open.svg';
import X from 'assets/images/icons/x.svg';
import {
  InventoryImport,
  DeckExportButton,
  InventoryDeleteButton,
  InventoryMissingButton,
  InventoryShareButton,
  ButtonIconed,
} from 'components';
import FolderPlus from 'assets/images/icons/folder-plus.svg';
import { useApp, deckStore } from 'context';

const InventoryButtons = ({
  setShowAddDeck,
  setShowAddPrecon,
  clan,
  type,
  discipline,
  missingByClan,
  missingByType,
  missingByDiscipline,
  crypt,
  library,
  setShowShareModal,
  inShared,
  setInventoryKey,
}) => {
  const {
    preconDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    publicName,
    isNarrow,
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
            variant="secondary"
            onClick={() => {
              setShowMenuButtons(false);
              setShowFloatingButtons(true);
              setInventoryKey(undefined);
              navigate('/inventory');
            }}
            title="Back to My Inventory"
            icon={<Folder2Open />}
            text="Back to My Inventory"
          />
        )}
        <DeckExportButton
          deck={{
            name: `Inventory ${new Date().toISOString().substring(0, 10)}`,
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
                variant="secondary"
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
                variant="secondary"
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
              missingByClan={missingByClan}
              missingByType={missingByType}
              missingByDiscipline={missingByDiscipline}
              clan={clan}
              type={type}
              discipline={discipline}
            />
            <InventoryShareButton setShow={setShowShareModal} />
          </>
        )}
      </div>
      {isNarrow && (
        <div
          onClick={handleClose}
          className="flex float-right-bottom float-clear items-center justify-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default InventoryButtons;
