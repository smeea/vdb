import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import Printer from '@icons/printer.svg?react';
import { Spinner, MenuButton, MenuItems, MenuItem } from '@/components';
import { CRYPT, LIBRARY, NAME } from '@/constants';
import { useApp } from '@/context';
import { pdfServices } from '@/services';

const DeckProxyButton = ({ setShowProxySelect, missingCrypt, missingLibrary, deck, inDiff }) => {
  const {
    inventoryMode,
    setShowFloatingButtons,
    setShowMenuButtons,
    isDesktop,
    cryptDeckSort,
    lang,
    showLegacyImage,
  } = useApp();

  const [isLoading, setIsLoading] = useState(false);

  const handleClickDeck = async (isWhite, isLetter) => {
    setIsLoading(true);
    await pdfServices.proxyCards(
      deck[CRYPT],
      deck[LIBRARY],
      {
        isWhite: isWhite,
        isLetter: isLetter,
      },
      cryptDeckSort,
      lang,
      showLegacyImage,
      deck[NAME],
    );
    setIsLoading(false);
  };

  const handleClickMissing = async (isWhite, isLetter) => {
    setIsLoading(true);
    await pdfServices.proxyCards(
      missingCrypt,
      missingLibrary,
      {
        isWhite: isWhite,
        isLetter: isLetter,
      },
      cryptDeckSort,
      lang,
      showLegacyImage,
      deck[NAME],
    );
    setIsLoading(false);
  };

  const handleClickSelect = () => {
    setShowProxySelect(true);
    setShowFloatingButtons(false);
    setShowMenuButtons(false);
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton
        title="Create PDF with Cards"
        icon={isLoading ? <Spinner /> : <Printer width="18" height="18" viewBox="0 0 18 16" />}
        variant={isDesktop ? 'secondary' : 'primary'}
        text="PDF Proxy"
      />
      <MenuItems>
        {!inDiff && (
          <>
            <MenuItem onClick={() => handleClickDeck(false, false)}>
              Full Deck - Gray gaps (A4)
            </MenuItem>
            <MenuItem onClick={() => handleClickDeck(true, false)}>
              Full Deck - White gaps (A4)
            </MenuItem>
            <MenuItem onClick={() => handleClickDeck(false, true)}>
              Full Deck - Gray gaps (Letter)
            </MenuItem>
            <MenuItem onClick={() => handleClickDeck(true, true)}>
              Full Deck - White gaps (Letter)
            </MenuItem>
          </>
        )}
        {(inventoryMode || inDiff) && (
          <>
            <MenuItem onClick={() => handleClickMissing(false, false)}>
              {`${inDiff ? 'Changes' : 'Missing in Inventory'} - Gray gaps (A4)`}
            </MenuItem>
            <MenuItem onClick={() => handleClickMissing(true, false)}>
              {`${inDiff ? 'Changes' : 'Missing in Inventory'} - White gaps (A4)`}
            </MenuItem>
            <MenuItem onClick={() => handleClickMissing(false, true)}>
              {`${inDiff ? 'Changes' : 'Missing in Inventory'} - Gray gaps (Letter)`}
            </MenuItem>
            <MenuItem onClick={() => handleClickMissing(true, true)}>
              {`${inDiff ? 'Changes' : 'Missing in Inventory'} - White gaps (Letter)`}
            </MenuItem>
          </>
        )}
        {!inDiff && <MenuItem onClick={handleClickSelect}>Select Cards</MenuItem>}
      </MenuItems>
    </Menu>
  );
};

export default DeckProxyButton;
