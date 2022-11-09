import React from 'react';
import { Link } from 'react-router-dom';
import PlayFill from 'assets/images/icons/play-fill.svg';
import { ButtonIconed } from 'components';

const TwdOpenDeckButton = ({ deckid, inHistory, noText }) => {
  return (
    <Link to={`/decks/${deckid}`}>
      <ButtonIconed
        className="w-100"
        variant={inHistory ? 'primary' : 'secondary'}
        icon={<PlayFill height="18" viewBox="0 0 12 14" />}
        text={noText ? null : 'Open'}
      />
    </Link>
  );
};

export default TwdOpenDeckButton;
