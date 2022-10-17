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
    publicName,
  } = useApp();

  const createNewDeck = () => {
    const name = 'New deck'
    const url = `${process.env.API_URL}deck`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setDecks((prevState) => ({
          ...prevState,
          [data.deckid]: {
            name: name,
            deckid: data.deckid,
            description: '',
            author: publicName,
            crypt: {},
            library: {},
            author: username,
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
