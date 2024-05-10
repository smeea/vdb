import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import Link45Deg from '@/assets/images/icons/link-45deg.svg?react';
import { MenuItems, MenuItem, MenuButton } from '@/components';
import { deckServices } from '@/services';
import { useApp } from '@/context';
import { getDeckInUrl } from '@/utils';

const DeckCopyUrlButton = ({ deck, noText, setQrUrl }) => {
  const { isDesktop, setShowMenuButtons, setShowFloatingButtons } = useApp();
  const [success, setSuccess] = useState(false);

  const handleStandard = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/decks/${deck.deckid.replace(' ', '_')}`;
    navigator.clipboard.writeText(url);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  const handleStandardQr = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/decks/${deck.deckid.replace(' ', '_')}`;

    setShowMenuButtons(false);
    setShowFloatingButtons(false);
    setQrUrl(url);
  };

  const handleDeckInUrl = () => {
    const url = getDeckInUrl(deck);
    navigator.clipboard.writeText(url);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  const handleDeckInQr = () => {
    const url = getDeckInUrl(deck);
    setShowMenuButtons(false);
    setShowFloatingButtons(false);
    setQrUrl(url);
  };

  const handleSnapshot = () => {
    deckServices.deckSnapshot(deck).then((deckid) => {
      const url = `${import.meta.env.VITE_BASE_URL}/decks/${deckid}`;
      navigator.clipboard.writeText(url);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
      }, 1000);
    });
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton
        title="Copy URL"
        icon={<Link45Deg width={noText ? 19 : 21} height={noText ? 19 : 21} viewBox="0 0 15 15" />}
        variant={success ? 'success' : noText || !isDesktop ? 'primary' : 'secondary'}
        text={noText ? null : success ? 'Copied' : 'Copy URL'}
      />
      <MenuItems divided>
        <>
          {deck.deckid !== 'deck' && (
            <div>
              <MenuItem
                title="Copy URL (will follow deck changes, if any)"
                onClick={handleStandard}
              >
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
          {(deck.deckid.length === 32 || deck.deckid === 'deck') && (
            <div>
              <div className="px-3 pt-2 text-sm text-midGray dark:text-midGrayDark">
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
              {deck.deckid.length === 32 && (
                <MenuItem
                  title="Copy URL to snapshot of the deck (will not follow deck changes)"
                  onClick={handleSnapshot}
                >
                  Snapshot URL
                </MenuItem>
              )}
            </div>
          )}
        </>
      </MenuItems>
    </Menu>
  );
};

export default DeckCopyUrlButton;
