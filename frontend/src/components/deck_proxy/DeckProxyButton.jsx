import { Menu } from "@headlessui/react";
import Printer from "@icons/printer.svg?react";
import { useState } from "react";
import { MenuButton, MenuItem, MenuItems, Spinner } from "@/components";
import { CRYPT, LIBRARY, NAME } from "@/constants";
import { useApp } from "@/context";
import { pdfServices } from "@/services";

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

  const generateWhiteA4 = () => handleClickDeck(true, false);
  const generateWhiteLetter = () => handleClickDeck(true, true);
  const generateGrayA4 = () => handleClickDeck(false, false);
  const generateGrayLetter = () => handleClickDeck(false, true);

  const generateMissingWhiteA4 = () => handleClickMissing(true, false);
  const generateMissingWhiteLetter = () => handleClickMissing(true, true);
  const generateMissingGrayA4 = () => handleClickMissing(false, false);
  const generateMissingGrayLetter = () => handleClickMissing(false, true);

  return (
    <Menu>
      <MenuButton
        title="Create PDF with Cards"
        icon={isLoading ? <Spinner /> : <Printer width="18" height="18" viewBox="0 0 18 16" />}
        variant={isDesktop ? "secondary" : "primary"}
        text="PDF Proxy"
      />
      <MenuItems>
        {!inDiff && (
          <>
            <MenuItem onClick={generateGrayA4}>Full Deck - Gray gaps (A4)</MenuItem>
            <MenuItem onClick={generateWhiteA4}>Full Deck - White gaps (A4)</MenuItem>
            <MenuItem onClick={generateGrayLetter}>Full Deck - Gray gaps (Letter)</MenuItem>
            <MenuItem onClick={generateWhiteLetter}>Full Deck - White gaps (Letter)</MenuItem>
          </>
        )}
        {(inventoryMode || inDiff) && (
          <>
            <MenuItem onClick={generateMissingGrayA4}>
              {`${inDiff ? "Changes" : "Missing in Inventory"} - Gray gaps (A4)`}
            </MenuItem>
            <MenuItem onClick={generateMissingWhiteA4}>
              {`${inDiff ? "Changes" : "Missing in Inventory"} - White gaps (A4)`}
            </MenuItem>
            <MenuItem onClick={generateMissingGrayLetter}>
              {`${inDiff ? "Changes" : "Missing in Inventory"} - Gray gaps (Letter)`}
            </MenuItem>
            <MenuItem onClick={generateMissingWhiteLetter}>
              {`${inDiff ? "Changes" : "Missing in Inventory"} - White gaps (Letter)`}
            </MenuItem>
          </>
        )}
        {!inDiff && <MenuItem onClick={handleClickSelect}>Select Cards</MenuItem>}
      </MenuItems>
    </Menu>
  );
};

export default DeckProxyButton;
