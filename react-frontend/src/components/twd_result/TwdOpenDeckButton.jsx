import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlayFill from 'assets/images/icons/play-fill.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const TwdOpenDeckButton = ({ deckid, inPda, inHistory }) => {
  const { setActiveDeck } = useApp();
  const navigate = useNavigate();

  const handleClick = () => {
    setActiveDeck({
      src: inPda ? 'shared' : 'twd',
      deckid: deckid,
    });
    navigate(`/decks?id=${deckid}`);
  };

  return (
    <ButtonIconed
      variant={inHistory ? 'primary' : 'secondary'}
      onClick={handleClick}
      icon={<PlayFill height="18" viewBox="0 0 12 14" />}
      text="Open"
    />
  );
};

export default TwdOpenDeckButton;
