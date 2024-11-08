import React, { useState, useRef } from 'react';
import { ErrorOverlay, InventoryImportButton, DeckImportBadCardsModal } from '@/components';
import { useApp, inventoryCardsAdd } from '@/context';
import { useDeckImport } from '@/hooks';
import { CRYPT, LIBRARY } from '@/constants';

const InventoryImport = () => {
  const { cryptCardBase, libraryCardBase } = useApp();

  const [importError, setImportError] = useState(false);
  const [badCards, setBadCards] = useState([]);
  const fileInput = useRef();

  const handleFileInputClick = () => {
    fileInput.current.click();
  };

  const importDeckFromFile = (fileInput) => {
    setImportError(false);

    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsText(file);
    reader.onload = async () => {
      const deckText = reader.result;
      const deck = await useDeckImport(deckText, cryptCardBase, libraryCardBase);

      setBadCards(deck.badCards);
      inventoryCardsAdd({ ...deck[CRYPT], ...deck[LIBRARY] });
    };
  };

  return (
    <>
      <InventoryImportButton handleClick={handleFileInputClick} />
      {badCards.length > 0 && (
        <DeckImportBadCardsModal badCards={badCards} setBadCards={setBadCards} inInventory />
      )}
      <input
        ref={fileInput}
        accept=".txt"
        type="file"
        onChange={() => importDeckFromFile(fileInput)}
        style={{ display: 'none' }}
      />
      {importError && <ErrorOverlay placement="left">CANNOT IMPORT THIS INVENTORY</ErrorOverlay>}
    </>
  );
};

export default InventoryImport;
