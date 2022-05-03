import React from 'react';
import { Stack } from 'react-bootstrap';
import {
  DeckImport,
  InventoryExportButton,
  InventoryDeleteButton,
  InventoryMissingButton,
} from 'components';
import FolderPlus from 'assets/images/icons/folder-plus.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const InventoryButtons = ({
  setShowButtons,
  setShowAddDeck,
  setShowAddPrecon,
  clan,
  type,
  discipline,
}) => {
  const { decks, preconDecks } = useApp();

  return (
    <Stack gap={1}>
      <InventoryExportButton setShowButtons={setShowButtons} />
      <DeckImport setShowButtons={setShowButtons} inInventory={true} />
      <InventoryDeleteButton setShowButtons={setShowButtons} />
      {decks && (
        <ButtonIconed
          variant="secondary"
          onClick={() => setShowAddDeck(true)}
          title="Add from your Deck"
          icon={<FolderPlus />}
          text="Add from Deck"
        />
      )}
      {preconDecks && (
        <ButtonIconed
          variant="secondary"
          onClick={() => setShowAddPrecon(true)}
          title="Add from Preconstructed Deck"
          icon={<FolderPlus />}
          text="Add from Precon"
        />
      )}
      <InventoryMissingButton
        setShowButtons={setShowButtons}
        clan={clan}
        type={type}
        discipline={discipline}
      />
    </Stack>
  );
};

export default InventoryButtons;
