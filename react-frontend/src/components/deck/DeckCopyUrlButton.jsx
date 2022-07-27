import React, { useState } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import Link45Deg from 'assets/images/icons/link-45deg.svg';
import { useApp } from 'context';

const DeckCopyUrlButton = ({ deck, noText, setShowQr }) => {
  const { setShowMenuButtons, setShowFloatingButtons } = useApp();
  const [state, setState] = useState(false);

  const handleStandardButton = () => {
    const url = `${process.env.ROOT_URL}decks?id=${deck.deckid}`;

    navigator.clipboard.writeText(url);
    setState(true);
    setTimeout(() => {
      setState(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  const handleStandardQrButton = () => {
    const url = `${process.env.ROOT_URL}decks?id=${deck.deckid}`;

    setShowMenuButtons(false);
    setShowFloatingButtons(false);
    setShowQr(url);
  };

  const handleDeckInUrlButton = () => {
    const url = getDeckInUrl();

    navigator.clipboard.writeText(url);
    setState(true);
    setTimeout(() => {
      setState(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  const handleDeckInQrButton = () => {
    const url = getDeckInUrl();

    setShowMenuButtons(false);
    setShowFloatingButtons(false);
    setShowQr(url);
  };

  const handleSnapshotButton = () => {
    const url = `${process.env.API_URL}decks/urlclone`;

    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: deck.deckid,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          const url = `${process.env.ROOT_URL}decks?id=${data.deckid}`;
          navigator.clipboard.writeText(url);
        }
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

  const ButtonOptions = (
    <>
      {deck.deckid !== 'deckInUrl' && (
        <>
          <Dropdown.Item
            onClick={handleStandardButton}
            title="Copy URL (will follow deck changes, if any)"
          >
            Standard URL
          </Dropdown.Item>
          <Dropdown.Item
            onClick={handleStandardQrButton}
            title="Create QR with Standard URL (will follow deck changes, if any)"
          >
            Standard URL - QR
          </Dropdown.Item>
        </>
      )}
      {(deck.deckid.length === 32 || deck.deckid === 'deckInUrl') && (
        <>
          <Dropdown.Divider />
          <Dropdown.Header>Non-modifiable</Dropdown.Header>
          <Dropdown.Item
            onClick={handleDeckInUrlButton}
            title="Copy long URL containing full deck info (will not follow deck changes)"
          >
            Deck-in-URL
          </Dropdown.Item>
          <Dropdown.Item
            onClick={handleDeckInQrButton}
            title="Create QR with long URL containing full deck info (will not follow deck changes)"
          >
            Deck-in-QR
          </Dropdown.Item>
        </>
      )}
      {deck.deckid.length === 32 && (
        <Dropdown.Item
          onClick={handleSnapshotButton}
          title="Copy URL to snapshot of the deck (will not follow deck changes)"
        >
          Snapshot URL
        </Dropdown.Item>
      )}
    </>
  );

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

    const url = `${process.env.ROOT_URL}decks?${info
      .toString()
      .replace(/,/g, '&')}#${cards
      .toString()
      .replace(/,/g, '')
      .replace(/;$/, '')}`;

    return url;
  };

  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        variant={state ? 'success' : noText ? 'primary' : 'secondary'}
        title={
          <div
            title="Copy URL"
            className="d-flex justify-content-center align-items-center"
          >
            <div className={`d-flex ${noText ? '' : 'pe-2'}`}>
              <Link45Deg
                width={noText ? '18' : '21'}
                height={noText ? '23' : '21'}
                viewBox="0 0 15 15"
              />
            </div>
            {!noText && (state ? 'Copied' : 'Copy URL')}
          </div>
        }
      >
        {ButtonOptions}
      </DropdownButton>
    </>
  );
};

export default DeckCopyUrlButton;
