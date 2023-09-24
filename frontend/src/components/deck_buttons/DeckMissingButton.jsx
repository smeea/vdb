import React, { useState } from 'react';
import Cart4 from '@/assets/images/icons/cart4.svg?react';
import { ButtonIconed, DeckMissingModal } from '@/components';
import { useApp } from '@/context';

const DeckMissing = ({ deck, missingCrypt, missingLibrary }) => {
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
        <DeckMissingModal
          show={showModal}
          deck={{
            ...deck,
            name: `Missing card for ${deck.name}`,
            crypt: missingCrypt,
            library: missingLibrary,
            isAuthor: false,
          }}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default DeckMissing;
