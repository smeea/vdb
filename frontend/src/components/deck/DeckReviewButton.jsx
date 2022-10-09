import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PencilSquare from 'assets/images/icons/pencil-square.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

const DeckReviewButton = ({ deckid }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [snapshotId, setSnapshotId] = useState(undefined);
  const navigate = useNavigate();

  const getSnapshot = (deckid) => {
    const url = `${process.env.API_URL}deck/${deckid}/snapshot`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setSnapshotId(data.deckid);
      });
  };

  useEffect(() => {
    if (snapshotId) {
      navigate(`/review?id=${snapshotId}`);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }
  }, [snapshotId]);

  return (
    <ButtonIconed
      variant="secondary"
      onClick={() => {
        getSnapshot(deckid);
      }}
      title="Review Deck"
      icon={<PencilSquare />}
      text="Review Deck"
    />
  );
};

export default DeckReviewButton;
