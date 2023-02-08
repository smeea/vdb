import React from 'react';
import { DeckRecommendationModal } from '@/components';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';

const DeckRecommendation = ({ setShow, deck }) => {
  const { cryptCardBase, libraryCardBase, setShowFloatingButtons } = useApp();
  const url = `${import.meta.env.VITE_API_URL}/deck/${
    deck.deckid
  }/recommendation`;

  const { value } = useFetch(url, {}, []);
  const crypt = [];
  const library = [];
  if (value) {
    Object.keys(value.crypt).map((i) => {
      crypt.push(cryptCardBase[value.crypt[i]]);
    });
    Object.keys(value.library).map((i) => {
      library.push(libraryCardBase[value.library[i]]);
    });
  }

  const handleCloseModal = () => {
    setShow(false);
    setShowFloatingButtons(true);
  };

  return (
    <DeckRecommendationModal
      handleClose={handleCloseModal}
      crypt={crypt}
      library={library}
    />
  );
};

export default DeckRecommendation;
