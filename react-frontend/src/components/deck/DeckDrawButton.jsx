import React from 'react';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckDrawButton = ({ setShowDraw }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();

  return (
    <ButtonIconed
      variant="secondary"
      onClick={() => {
        setShowDraw(true);
        setShowMenuButtons(false);
        setShowFloatingButtons(false);
      }}
      title="Deck Draw Simulator"
      icon={<Dice3 />}
      text="Draw Cards"
    />
  );
};

export default DeckDrawButton;
