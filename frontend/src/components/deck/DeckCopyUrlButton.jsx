import React, { useState } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import Link45Deg from 'assets/images/icons/link-45deg.svg';
import { useApp } from 'context';

const DeckCopyUrlButton = ({ deck, noText, setQrUrl }) => {
  const { setShowMenuButtons, setShowFloatingButtons } = useApp();
  const [state, setState] = useState(false);

  const handleStandardButton = () => {
    const url = `${process.env.ROOT_URL}decks/${deck.deckid.replace(' ', '_')}`;

    navigator.clipboard.writeText(url);
    setState(true);
    setTimeout(() => {
      setState(false);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }, 1000);
  };

  const handleStandardQrButton = () => {
    const url = `${process.env.ROOT_URL}decks/${deck.deckid.replace(' ', '_')}`;

    setShowMenuButtons(false);
    setShowFloatingButtons(false);
    setQrUrl(url);
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
    setQrUrl(url);
  };

  const handleSnapshotButton = () => {
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

  const ButtonOptions = (
    <>
      {deck.deckid !== 'deck' && (
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
      {(deck.deckid.length === 32 || deck.deckid === 'deck') && (
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

    const url = `${process.env.ROOT_URL}decks/deck?${info
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
          noText ? (
            <Link45Deg width="19" height="19" viewBox="0 0 15 15" />
          ) : (
            <>
              <div
                title="Copy URL"
                className="d-flex justify-content-center align-items-center"
              >
                <div className="d-flex pe-2">
                  <Link45Deg width="21" height="21" viewBox="0 0 15 15" />
                </div>
                {state ? 'Copied' : 'Copy URL'}
              </div>
            </>
          )
        }
      >
        {ButtonOptions}
      </DropdownButton>
    </>
  );
};

export default DeckCopyUrlButton;
