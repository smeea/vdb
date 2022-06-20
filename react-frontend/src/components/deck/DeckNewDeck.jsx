import React from 'react';
import ClipboardPlus from 'assets/images/icons/clipboard-plus.svg';
import { ButtonIconed } from 'components';
import { useApp } from 'context';

const DeckNewDeck = ({ setShowInfo }) => {
  const {
    setDecks,
    setActiveDeck,
    setShowMenuButtons,
    setShowFloatingButtons,
  } = useApp();

  const createNewDeck = () => {
    const url = `${process.env.API_URL}decks/create`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckname: 'New deck' }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setDecks((prevState) => ({
          ...prevState,
          [data.deckid]: {
            ...data,
            crypt: {},
            library: {},
            branchName: '#0',
            is_yours: true,
          },
        }));
        setShowInfo(true);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
        setActiveDeck({ src: 'my', deckid: data.deckid });
      });
  };

  return (
    <>
      <ButtonIconed
        variant="primary"
        onClick={() => createNewDeck()}
        icon={<ClipboardPlus />}
        text="Create New Deck"
      />
    </>
  );
};

export default DeckNewDeck;
