import React, { useState, useRef } from 'react';
import {
  ErrorOverlay,
  InventoryImportButton,
  DeckImportBadCardsModal,
} from 'components';
import { useApp } from 'context';
import { useDeckImport } from 'hooks';

const InventoryImport = () => {
  const { activeDeck, inventoryCardsAdd, cryptCardBase, libraryCardBase } =
    useApp();

  const [importError, setImportError] = useState(false);
  const [badCards, setBadCards] = useState([]);
  const ref = useRef(null);

  const fileInputTxt = React.createRef();
  const fileInputEld = React.createRef();

  const handleFileInputClick = (format) => {
    switch (format) {
      case 'txt':
        fileInputTxt.current.click();
        break;
      case 'eld':
        fileInputEld.current.click();
        break;
    }
  };

  const importDeckFromFile = ({ format, file }) => {
    setImportError(false);

    const reader = new FileReader();
    reader.readAsText(file.current.files[0]);
    reader.onload = async () => {
      let deckText;
      switch (format) {
        case 'txt':
          deckText = reader.result;
          break;
        case 'eld':
          deckText = '';
          const cards = reader.result.split('\n');
          cards.forEach((res) => {
            const card = res.split(',');
            if (card.length >= 5) {
              let name = card[0].slice(1);
              const n = card.length - 5;
              if (n) {
                for (let i = 1; i <= n; i++) {
                  name += `, ${card[i]}`;
                }
              }
              name = name.slice(0, -1);
              const q = card[n + 1];

              if (q && name) deckText += `${q} ${name}\n`;
            }
          });
          break;
      }

      const deck = await useDeckImport(
        deckText,
        cryptCardBase,
        libraryCardBase
      );

      inventoryCardsAdd(deck.cards);
    };
  };

  return (
    <>
      <InventoryImportButton handleClick={handleFileInputClick} />
      {badCards && (
        /* TODO FIX FOR INVENTORY */
        <DeckImportBadCardsModal
          deckid={activeDeck.deckid}
          badCards={badCards}
          setBadCards={setBadCards}
        />
      )}
      <input
        ref={fileInputTxt}
        accept="text/*"
        type="file"
        onChange={() =>
          importDeckFromFile({
            format: 'txt',
            file: fileInputTxt,
          })
        }
        style={{ display: 'none' }}
      />
      <input
        ref={fileInputEld}
        accept="text/*"
        type="file"
        onChange={() =>
          importDeckFromFile({
            format: 'eld',
            file: fileInputEld,
          })
        }
        style={{ display: 'none' }}
      />
      <ErrorOverlay
        show={importError}
        target={ref.current}
        placement="left"
        modal={true}
      >
        {importError && <b>CANNOT IMPORT THIS DECK</b>}
      </ErrorOverlay>
    </>
  );
};

export default InventoryImport;
