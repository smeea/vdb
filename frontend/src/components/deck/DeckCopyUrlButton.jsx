import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import Link45Deg from 'assets/images/icons/link-45deg.svg';
import { MenuButton } from 'components';
import { useApp } from 'context';

const DeckCopyUrlButton = ({ deck, noText, setQrUrl }) => {
  const { setShowMenuButtons, setShowFloatingButtons } = useApp();
  const [state, setState] = useState(false);

  const handleStandard = () => {
    const url = `${process.env.ROOT_URL}decks/${deck.deckid.replace(' ', '_')}`;

    navigator.clipboard.writeText(url);
    setState(true);
    setTimeout(() => {
      setState(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  const handleStandardQr = () => {
    const url = `${process.env.ROOT_URL}decks/${deck.deckid.replace(' ', '_')}`;

    setShowMenuButtons(false);
    setShowFloatingButtons(false);
    setQrUrl(url);
  };

  const handleDeckInUrl = () => {
    const url = getDeckInUrl();

    navigator.clipboard.writeText(url);
    setState(true);
    setTimeout(() => {
      setState(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  const handleDeckInQr = () => {
    const url = getDeckInUrl();

    setShowMenuButtons(false);
    setShowFloatingButtons(false);
    setQrUrl(url);
  };

  const handleSnapshot = () => {
    const cards = {};
    Object.keys(deck.crypt).map((cardid) => {
      cards[cardid] = deck.crypt[cardid].q;
    });
    Object.keys(deck.library).map((cardid) => {
      cards[cardid] = deck.library[cardid].q;
    });

    const url = `${process.env.API_URL}deck`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: deck.name,
        description: deck.description,
        author: deck.author,
        cards: cards,
        tags: deck.tags,
        anonymous: true,
      }),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((data) => {
        const url = `${process.env.ROOT_URL}decks/${data.deckid}`;
        navigator.clipboard.writeText(url);
      })
      .then(() => {
        setState(true);
        setTimeout(() => {
          setState(false);
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
        }, 1000);
      });
  };

  const getDeckInUrl = () => {
    const cards = [];

    Object.keys(deck.crypt).map((card) => {
      cards.push(`${card}=${deck.crypt[card].q};`);
    });
    Object.keys(deck.library).map((card) => {
      cards.push(`${card}=${deck.library[card].q};`);
    });

    const info = [];
    deck.name && info.push(encodeURI(`name=${deck.name}`));
    deck.author && info.push(encodeURI(`author=${deck.author}`));
    deck.description &&
      info.push(
        encodeURI(`description=${deck.description.substring(0, 7168)}`)
          .replace(/#/g, '%23')
          .replace(/&/g, '%26')
          .replace(/,/g, '%2C')
      );

    const url = `${process.env.ROOT_URL}decks/deck?${info
      .toString()
      .replace(/,/g, '&')}#${cards
      .toString()
      .replace(/,/g, '')
      .replace(/;$/, '')}`;

    return url;
  };

  return (
    <Menu>
      <MenuButton
        title="Copy URL"
        icon={
          <Link45Deg
            width={noText ? 19 : 21}
            height={noText ? 19 : 21}
            viewBox="0 0 15 15"
          />
        }
        variant={state ? 'success' : noText ? 'primary' : 'secondary'}
        text={state ? 'Copied' : 'Copy URL'}
      />
      <Menu.Items>
        <>
          {deck.deckid !== 'deck' && (
            <>
              <Menu.Item title="Copy URL (will follow deck changes, if any)">
                <div onClick={handleStandard}>Standard URL</div>
              </Menu.Item>
              <Menu.Item title="Create QR with Standard URL (will follow deck changes, if any)">
                <div onClick={handleStandardQr}>Standard URL - QR</div>
              </Menu.Item>
            </>
          )}
          {(deck.deckid.length === 32 || deck.deckid === 'deck') && (
            <>
              {/* <Dropdown.Divider /> */}
              {/* <Dropdown.Header>Non-modifiable</Dropdown.Header> */}
              <Menu.Item title="Copy long URL containing full deck info (will not follow deck changes)">
                <div onClick={handleDeckInUrl}>Deck-in-URL</div>
              </Menu.Item>
              <Menu.Item title="Create QR with long URL containing full deck info (will not follow deck changes)">
                <div onClick={handleDeckInQr}>Deck-in-QR</div>
              </Menu.Item>
            </>
          )}
          {deck.deckid.length === 32 && (
            <Menu.Item title="Copy URL to snapshot of the deck (will not follow deck changes)">
              <div onClick={handleSnapshot}>Snapshot URL</div>
            </Menu.Item>
          )}
        </>
      </Menu.Items>
    </Menu>
  );
};

export default DeckCopyUrlButton;
