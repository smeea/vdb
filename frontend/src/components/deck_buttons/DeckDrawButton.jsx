import React from 'react';
import Dice3 from '@/assets/images/icons/dice-3-fill.svg';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';

const DeckDrawButton = ({ setShow }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const handleClick = () => {
    setShow(true);
    setShowMenuButtons(false);
    setShowFloatingButtons(false);
  };

  return (
    <ButtonIconed
      variant={isDesktop ? 'secondary' : 'primary'}
      onClick={handleClick}
      title="Deck Draw Simulator"
      icon={<Dice3 />}
      text="Draw Cards"
    />
  );
};

export default DeckDrawButton;
