import React, { useMemo } from 'react';
import { DeckRecommendationModal } from '@/components';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';
import { LIBRARY, CRYPT, ID } from '@/constants';

const DeckRecommendation = ({ setShow, deck }) => {
  const { cryptCardBase, libraryCardBase, setShowFloatingButtons } = useApp();
  const cards = {};
  [...Object.values(deck[CRYPT]), ...Object.values(deck[LIBRARY])].forEach((card) => {
    if (card.q) cards[card.c[ID]] = card.q;
  });

  const url = `${import.meta.env.VITE_API_URL}/deck/recommendation`;
  const { value } = useFetch(
    url,
    {
      method: 'POST',
      json: { cards: cards },
    },
    [deck],
  );

  const crypt = useMemo(() => {
    return value
      ? value[CRYPT].map((cardid) => {
          return cryptCardBase[cardid];
        })
      : null;
  }, value[CRYPT]);

  const library = useMemo(() => {
    return value
      ? value[LIBRARY].map((cardid) => {
          return libraryCardBase[cardid];
        })
      : null;
  }, value[LIBRARY]);

  const handleCloseModal = () => {
    setShow(false);
    setShowFloatingButtons(true);
  };

  return <DeckRecommendationModal handleClose={handleCloseModal} crypt={crypt} library={library} />;
};

export default DeckRecommendation;
