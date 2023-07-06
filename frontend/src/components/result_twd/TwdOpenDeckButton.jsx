import React from 'react';
import { Link } from 'react-router-dom';
import PlayFill from '@/assets/images/icons/play-fill.svg';
import { ButtonIconed } from '@/components';

const TwdOpenDeckButton = ({ deckid, url, noText }) => {
  return (
    <Link to={url ?? `/decks/${deckid}`} className="hover:no-underline">
      <ButtonIconed
        className="w-full"
        variant="primary"
        icon={<PlayFill height="18" viewBox="0 0 12 14" />}
        text={noText ? null : 'Open'}
      />
    </Link>
  );
};

export default TwdOpenDeckButton;
