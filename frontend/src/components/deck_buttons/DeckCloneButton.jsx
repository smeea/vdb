import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Files from '@/assets/images/icons/files.svg';
import { deckStore, useApp } from '@/context';
import { ButtonIconed } from '@/components';

const DeckCloneButton = ({ deck, inTwdPda, noText }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const cloneDeck = () => {
    const name = `${deck.name} [by ${deck.author}]`;
    const cards = {};
    Object.keys(deck.crypt).map((cardid) => {
      cards[cardid] = deck.crypt[cardid].q;
    });
    Object.keys(deck.library).map((cardid) => {
      cards[cardid] = deck.library[cardid].q;
    });

    const url = `${import.meta.env.VITE_API_URL}/deck`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: deck.description,
        author: deck.author,
        cards: cards,
        tags: deck.tags,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          const now = new Date();

          deckStore.decks[data.deckid] = {
            branchName: null,
            branches: [],
            crypt: { ...deck.crypt },
            library: { ...deck.library },
            deckid: data.deckid,
            master: null,
            name: name,
            timestamp: now.toUTCString(),
            tags: deck.tags,
            author: deck.author,
            description: deck.description,
            isAuthor: true,
            isBranches: false,
          };

          if (!inTwdPda) navigate(`/decks/${data.deckid}`);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }, 1000);
        }
      });
  };

  return (
    <ButtonIconed
      className="w-full"
      variant={
        success
          ? 'success'
          : inTwdPda || noText || !isDesktop
          ? 'primary'
          : 'secondary'
      }
      onClick={cloneDeck}
      title="Clone Deck to your account for editing"
      icon={<Files />}
      text={!noText && (success ? 'Cloned' : 'Clone')}
    />
  );
};

export default DeckCloneButton;
