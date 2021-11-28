import React, { useState, useContext } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';
import BlockButton from './BlockButton.jsx';
import AppContext from '../../context/AppContext.js';

function DeckCopyUrl(props) {
  const { isMobile } = useContext(AppContext);
  const [state, setState] = useState(false);

  const handleStandardButton = () => {
    const deckUrl = `${process.env.ROOT_URL}decks?id=${props.deck.deckid}`;

    navigator.clipboard.writeText(deckUrl);
    setState(true);
    setTimeout(() => {
      setState(false);
      isMobile && props.setShowButtons(false);
    }, 1000);
  };

  const handleDeckInUrlButton = () => {
    const cards = [];

    Object.keys(props.deck.crypt).map((card) => {
      cards.push(`${card}=${props.deck.crypt[card].q};`);
    });
    Object.keys(props.deck.library).map((card) => {
      cards.push(`${card}=${props.deck.library[card].q};`);
    });

    const info = [];
    props.deck.name && info.push(encodeURI(`name=${props.deck.name}`));
    props.deck.author && info.push(encodeURI(`author=${props.deck.author}`));
    props.deck.description &&
      info.push(
        encodeURI(`description=${props.deck.description.substring(0, 7168)}`)
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

    navigator.clipboard.writeText(url);
    setState(true);
    setTimeout(() => {
      setState(false);
      isMobile && props.setShowButtons(false);
    }, 1000);
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
        target: props.deck.deckid,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          const deckUrl = `${process.env.ROOT_URL}decks?id=${data.deckid}`;
          navigator.clipboard.writeText(deckUrl);
        }
      })
      .then(() => {
        setState(true);
        setTimeout(() => {
          setState(false);
          isMobile && props.setShowButtons(false);
        }, 1000);
      });
  };

  const Options = (
    <>
      <Dropdown.Item
        onClick={handleStandardButton}
        title="Copy URL (will follow deck changes, if any)"
      >
        Standard URL
      </Dropdown.Item>
      <Dropdown.Item
        onClick={handleDeckInUrlButton}
        title="Copy long URL containing full deck info (will not follow deck changes)"
      >
        Deck-in-URL
      </Dropdown.Item>
      {props.isAuthor && (
        <Dropdown.Item
          onClick={handleSnapshotButton}
          title="Copy URL to snapshot of the deck (will not follow deck changes)"
        >
          Snapshot URL
        </Dropdown.Item>
      )}
    </>
  );

  return (
    <>
      {props.deck.deckid.length == 32 ? (
        <Dropdown title="Copy Deck URL" className="d-inline">
          <Dropdown.Toggle
            as={props.noText ? Button : BlockButton}
            variant={state ? 'success' : props.noText ? 'primary' : 'secondary'}
          >
            <div className="d-flex justify-content-center align-items-center">
              <div className={props.noText ? null : 'pe-2'}>
                <ShareFill />
              </div>
              {!props.noText && (state ? 'Copied' : 'Copy URL')}
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>{Options}</Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          variant={state ? 'success' : 'secondary'}
          onClick={handleStandardButton}
          title="Copy Standard Deck URL (will follow future deck changes)"
        >
          <ShareFill /> {!props.noText && (state ? 'Copied' : 'Copy URL')}
        </Button>
      )}
    </>
  );
}

export default DeckCopyUrl;
