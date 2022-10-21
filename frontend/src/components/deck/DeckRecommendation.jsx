import React, { useState } from 'react';
import { DeckRecommendationModal } from 'components';
import { useApp } from 'context';

const DeckRecommendation = ({ setShow, deck }) => {
  const { cryptCardBase, libraryCardBase, setShowFloatingButtons } = useApp();
  const [showModal, setShowModal] = useState(true);
  const [crypt, setCrypt] = useState(undefined);
  const [library, setLibrary] = useState(undefined);

  const getRecommendation = () => {
    const url = `${process.env.API_URL}deck/${deck.deckid}/recommendation`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          const c = [];
          const l = [];
          Object.keys(data.crypt).map((i) => {
            c.push(cryptCardBase[data.crypt[i]]);
          });
          Object.keys(data.library).map((i) => {
            l.push(libraryCardBase[data.library[i]]);
          });
          setCrypt(c);
          setLibrary(l);
        }
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShow(false);
    setShowFloatingButtons(true);
  };

  if (!crypt && !library) getRecommendation();

  return (
    <>
      {showModal && (
        <DeckRecommendationModal
          handleClose={handleCloseModal}
          show={showModal}
          crypt={crypt}
          library={library}
        />
      )}
    </>
  );
};

export default DeckRecommendation;
