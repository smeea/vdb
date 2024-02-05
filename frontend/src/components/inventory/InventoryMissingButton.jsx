import React, { useState, useMemo } from 'react';
import Cart4 from '@/assets/images/icons/cart4.svg?react';
import { ButtonIconed, InventoryMissingModalWrapper } from '@/components';
import { useApp, inventoryStore } from '@/context';

const InventoryMissingButton = ({
  clan,
  type,
  discipline,
  crypt,
  library,
  category,
  onlyNotes,
}) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [showModal, setShowModal] = useState();

  const handleClose = () => {
    setShowModal(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <ButtonIconed
        variant={isDesktop ? 'secondary' : 'primary'}
        onClick={() => setShowModal(true)}
        title="Get Missing in Inventory Cards"
        icon={<Cart4 />}
        text="Missing Cards"
      />
      {showModal && (
        <InventoryMissingModalWrapper
          crypt={crypt}
          library={library}
          category={category}
          onlyNotes={onlyNotes}
          clan={clan}
          type={type}
          discipline={discipline}
          handleClose={handleClose}
        />
      )}
      {/* {showModal && ( */}
      {/*   <DeckMissingModal */}
      {/*     deck={{ */}
      {/*       name: 'Missing cards for Inventory', */}
      {/*       author: publicName, */}
      {/*       description: '', */}
      {/*       crypt: missingCrypt, */}
      {/*       library: missingLibrary, */}
      {/*       deckid: 'missingInInventory', */}
      {/*     }} */}
      {/*     missAllVtes={{ crypt: missAllVtesCrypt, library: missAllVtesLibrary }} */}
      {/*     show={showModal} */}
      {/*     handleClose={handleClose} */}
      {/*     inInventory */}
      {/*   /> */}
    </>
  );
};

export default InventoryMissingButton;
