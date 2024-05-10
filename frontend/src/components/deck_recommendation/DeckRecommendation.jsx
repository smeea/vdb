import React from 'react';
import { DeckRecommendationModal } from '@/components';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';

const DeckRecommendation = ({ setShow, deck }) => {
  const { cryptCardBase, libraryCardBase, setShowFloatingButtons } = useApp();
  const cards = {};
  [...Object.values(deck.crypt), ...Object.values(deck.library)].forEach((card) => {
    if (card.q) cards[card.c.Id] = card.q;
  });

  const url = `${import.meta.env.VITE_API_URL}/deck/recommendation`;
  const { value } = useFetch(
    url,
    {
      method: 'POST',
      body: JSON.stringify({ cards: cards }),
    },
    [deck],
  );

  const crypt = value
    ? value.crypt.map((cardid) => {
        return cryptCardBase[cardid];
      })
    : null;

  const library = value
    ? value.library.map((cardid) => {
        return libraryCardBase[cardid];
      })
    : null;

  const handleCloseModal = () => {
    setShow(false);
    setShowFloatingButtons(true);
  };

  return <DeckRecommendationModal handleClose={handleCloseModal} crypt={crypt} library={library} />;
};

export default DeckRecommendation;
