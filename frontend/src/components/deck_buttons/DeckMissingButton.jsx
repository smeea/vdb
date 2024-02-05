import React, { useState } from 'react';
import Cart4 from '@/assets/images/icons/cart4.svg?react';
import { ButtonIconed, DeckMissingModalWrapper } from '@/components';
import { useApp } from '@/context';

const DeckMissingButton = ({ deck }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [showModal, setShowModal] = useState();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <ButtonIconed
        variant={isDesktop ? 'secondary' : 'primary'}
        onClick={handleClick}
        title="Get Missing in Inventory Cards"
        icon={<Cart4 />}
        text="Missing Cards"
      />
      {showModal && (
        <DeckMissingModalWrapper deck={deck} handleClose={handleClose} />
      )}
    </>
  );
};

export default DeckMissingButton;
