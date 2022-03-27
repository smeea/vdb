import React from 'react';
import { Stack } from 'react-bootstrap';
import {
  DeckImportButton,
  InventoryExportButton,
  InventoryDeleteButton,
  InventoryMissingButton,
} from 'components';
import FolderPlus from 'assets/images/icons/folder-plus.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

function InventoryButtons(props) {
  const { decks, preconDecks } = useApp();

  return (
    <Stack gap={1}>
      <InventoryExportButton setShowButtons={props.setShowButtons} />
      <DeckImportButton
        inventoryAddToState={props.inventoryAddToState}
        setShowButtons={props.setShowButtons}
        inInventory={true}
      />
      <InventoryDeleteButton
        setInventoryCrypt={props.setInventoryCrypt}
        setInventoryLibrary={props.setInventoryLibrary}
        setShowButtons={props.setShowButtons}
      />
      {decks && (
        <ButtonIconed
          variant="secondary"
          onClick={() => props.setShowAddDeck(true)}
          title="Add from your Deck"
          icon={<FolderPlus />}
          text="Add from Deck"
        />
      )}
      {preconDecks && (
        <ButtonIconed
          variant="secondary"
          onClick={() => props.setShowAddPrecon(true)}
          title="Add from Preconstructed Deck"
          icon={<FolderPlus />}
          text="Add from Precon"
        />
      )}
      <InventoryMissingButton
        setShowButtons={props.setShowButtons}
        clan={props.clan}
        type={props.type}
        discipline={props.discipline}
      />
    </Stack>
  );
}

export default InventoryButtons;
