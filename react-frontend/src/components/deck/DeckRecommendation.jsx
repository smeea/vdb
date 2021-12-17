import React, { useState, useEffect } from 'react';
import { DeckRecommendationModal } from 'components';
import { useApp } from 'context';

function DeckRecommendation(props) {
  const { cryptCardBase, libraryCardBase } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [crypt, setCrypt] = useState(undefined);
  const [library, setLibrary] = useState(undefined);

  const getRecommendation = () => {
    const url = `${process.env.API_URL}deck/${props.deck.deckid}/recommendation`;
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
    props.setShow(false);
    props.setShowFloatingButtons(true);
  };

  useEffect(() => {
    setShowModal(true);
    getRecommendation();
    props.setShowFloatingButtons(false);
  }, []);

  return (
    <>
      {showModal && (
        <DeckRecommendationModal
          isAuthor={props.isAuthor}
          activeDeck={props.deck}
          handleClose={handleCloseModal}
          show={showModal}
          crypt={crypt}
          library={library}
        />
      )}
    </>
  );
}

export default DeckRecommendation;
