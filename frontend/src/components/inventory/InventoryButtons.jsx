import React from 'react';
import { Stack } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import {
  DeckImport,
  DeckExportButton,
  InventoryDeleteButton,
  InventoryMissingButton,
  ButtonIconed,
} from 'components';
import FolderPlus from 'assets/images/icons/folder-plus.svg';
import { useApp } from 'context';

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
  handleClose,
}) => {
  const {
    decks,
    preconDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    publicName,
    isNarrow,
  } = useApp();

  return (
    <>
      <Stack gap={1}>
        <DeckExportButton
          deck={{
            name: `Inventory ${new Date().toISOString().substring(0, 10)}`,
            author: publicName,
            crypt: crypt,
            library: library,
          }}
          inInventory
        />
        <DeckImport inInventory />
        <InventoryDeleteButton />
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
        <InventoryMissingButton
          missingByClan={missingByClan}
          missingByType={missingByType}
          missingByDiscipline={missingByDiscipline}
          clan={clan}
          type={type}
          discipline={discipline}
        />
      </Stack>
      {isNarrow && (
        <div
          onClick={handleClose}
          className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default InventoryButtons;
