import React, { useState, useMemo } from 'react';
import Cart4 from 'assets/images/icons/cart4.svg';
import { ButtonIconed, DeckMissingModal } from 'components';
import { useApp } from 'context';

const InventoryMissingButton = ({
  clan,
  type,
  discipline,
  missingByClan,
  missingByType,
  missingByDiscipline,
}) => {
  const {
    inventoryCrypt,
    inventoryLibrary,
    cryptCardBase,
    libraryCardBase,
    publicName,
    setShowFloatingButtons,
    setShowMenuButtons,
  } = useApp();

  const [showModal, setShowModal] = useState(undefined);

  const handleClose = () => {
    setShowModal(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const missingCrypt = useMemo(() => {
    if (missingByClan) return missingByClan[clan];
    else return {};
  }, [clan, missingByClan]);

  const missingLibrary = useMemo(() => {
    if (missingByDiscipline && missingByType) {
      const missing = {};
      Object.values(missingByType[type])
        .filter((i) => {
          return missingByDiscipline[discipline][i.c.Id];
        })
        .map((i) => (missing[i.c.Id] = i));
      return missing;
    } else {
      return {};
    }
  }, [type, discipline, missingByType, missingByDiscipline]);

  const missAllVtesCrypt = {};
  const missAllVtesLibrary = {};

  Object.keys(cryptCardBase)
    .filter((cardid) => {
      return (
        cardid < 210000 &&
        (!inventoryCrypt[cardid] || !inventoryCrypt[cardid]?.q)
      );
    })
    .map(
      (cardid) =>
        (missAllVtesCrypt[cardid] = { q: 1, c: cryptCardBase[cardid] })
    );

  Object.keys(libraryCardBase)
    .filter((cardid) => {
      return (
        cardid < 110000 &&
        (!inventoryLibrary[cardid] || !inventoryLibrary[cardid]?.q)
      );
    })
    .map(
      (cardid) =>
        (missAllVtesLibrary[cardid] = { q: 1, c: libraryCardBase[cardid] })
    );

  return (
    <>
      <ButtonIconed
        variant="secondary"
        onClick={() => setShowModal(true)}
        title="Get Missing in Inventory Cards"
        icon={<Cart4 />}
        text="Missing Cards"
      />
      {showModal && (
        <DeckMissingModal
          deck={{
            name: 'Missing cards for Inventory',
            author: publicName,
            description: '',
            crypt: missingCrypt,
            library: missingLibrary,
            deckid: 'missingInInventory',
          }}
          missAllVtes={{ crypt: missAllVtesCrypt, library: missAllVtesLibrary }}
          show={showModal}
          handleClose={handleClose}
          inInventory={true}
        />
      )}
    </>
  );
};

export default InventoryMissingButton;
