import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlayFill from 'assets/images/icons/play-fill.svg';
import { ButtonIconed } from 'components';

const TwdOpenDeckButton = ({ deckid, inHistory, noText }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/decks/${deckid}`);
  };

  return (
    <ButtonIconed
      variant={inHistory ? 'primary' : 'secondary'}
      onClick={handleClick}
      icon={<PlayFill height="18" viewBox="0 0 12 14" />}
      text={noText ? null : 'Open'}
    />
  );
};

export default TwdOpenDeckButton;
