import { Menu } from "@headlessui/react";
import { useState } from "react";
import Link45Deg from "@icons/link-45deg.svg?react";
import { MenuButton, MenuItem, MenuItems } from "@/components";
import { DECK, DECKID } from "@/constants";
import { useApp } from "@/context";
import { deckServices } from "@/services";
import { getDeckInUrl } from "@/utils";

const DeckCopyUrlButton = ({ deck, noText, setQrUrl, className }) => {
  const { isDesktop, setShowMenuButtons, setShowFloatingButtons } = useApp();
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  const handleStandard = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/decks/${deck[DECKID].replace(" ", "_")}`;
    navigator.clipboard.writeText(url);
    handleSuccess();
  };

  const handleStandardQr = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/decks/${deck[DECKID].replace(" ", "_")}`;
    setShowMenuButtons(false);
    setShowFloatingButtons(false);
    setQrUrl(url);
  };

  const handleDeckInUrl = () => {
    const url = getDeckInUrl(deck);
    navigator.clipboard.writeText(url);
    handleSuccess();
  };

  const handleDeckInQr = () => {
    const url = getDeckInUrl(deck);
    setShowMenuButtons(false);
    setShowFloatingButtons(false);
    setQrUrl(url);
  };

  const handleSnapshot = () => {
    if (typeof ClipboardItem === "function" && !!navigator.clipboard.write) {
      const url = new ClipboardItem({
        "text/plain": deckServices.deckSnapshot(deck).then((deckid) => {
          return new Blob([`${import.meta.env.VITE_BASE_URL}/decks/${deckid}`], {
            type: "text/plain",
          });
        }),
      });
      navigator.clipboard.write([url]);
    } else {
      deckServices.deckSnapshot(deck).then((deckid) => {
        const url = `${import.meta.env.VITE_BASE_URL}/decks/${deckid}`;
        navigator.clipboard.writeText(url);
        handleSuccess();
      });
    }
  };

  return (
    <Menu>
      <MenuButton
        className={className}
        title="Copy URL"
        icon={<Link45Deg width={noText ? 19 : 21} height={noText ? 19 : 21} viewBox="0 0 15 15" />}
        variant={success ? "success" : noText || !isDesktop ? "primary" : "secondary"}
        text={noText ? null : success ? "Copied" : "Copy URL"}
      />
      <MenuItems divided>
        {deck[DECKID] !== DECK && (
          <div>
            <MenuItem title="Copy URL (will follow deck changes, if any)" onClick={handleStandard}>
              Standard URL
            </MenuItem>
            <MenuItem
              title="Create QR with Standard URL (will follow deck changes, if any)"
              onClick={handleStandardQr}
            >
              Standard URL - QR
            </MenuItem>
          </div>
        )}
        {(deck[DECKID].length === 9 || deck[DECKID] === DECK) && (
          <div>
            <div className="px-3 pt-2 text-midGray text-sm dark:text-midGrayDark">
              Non-modifiable:
            </div>
            <MenuItem
              title="Copy long URL containing full deck info (will not follow deck changes)"
              onClick={handleDeckInUrl}
            >
              Deck-in-URL
            </MenuItem>
            <MenuItem
              title="Create QR with long URL containing full deck info (will not follow deck changes)"
              onClick={handleDeckInQr}
            >
              Deck-in-QR
            </MenuItem>
            {deck[DECKID].length === 9 && (
              <MenuItem
                title="Copy URL to snapshot of the deck (will not follow deck changes)"
                onClick={handleSnapshot}
              >
                Snapshot URL
              </MenuItem>
            )}
          </div>
        )}
      </MenuItems>
    </Menu>
  );
};

export default DeckCopyUrlButton;
