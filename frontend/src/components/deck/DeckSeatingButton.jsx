import React from 'react';
import Recycle from 'assets/images/icons/recycle.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

const DeckSeatingButton = ({ setShow }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();

  return (
    <ButtonIconed
      variant="secondary"
      onClick={() => {
        setShow(true);
        setShowMenuButtons(false);
        setShowFloatingButtons(false);
      }}
      title="Table Seating"
      icon={<Recycle width="18" height="18" viewBox="0 0 16 16" />}
      text="Table Seating"
    />
  );
};

export default DeckSeatingButton;
