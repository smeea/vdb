import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlusSlashMinus from 'assets/images/icons/plus-slash-minus.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

const DeckDiffButton = (props) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();

  return (
    <ButtonIconed
      variant="secondary"
      onClick={() => {
        isMobile && props.setShowButtons(false);
        navigate(`/diff?from=${props.deckid}&to=${props.deckid}`);
      }}
      title="Compare Decks"
      icon={<PlusSlashMinus />}
      text="Compare Decks"
    />
  );
};

export default DeckDiffButton;
