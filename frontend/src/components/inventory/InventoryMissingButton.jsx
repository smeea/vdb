import React, { useState, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import Cart4 from '@/assets/images/icons/cart4.svg';
import { ButtonIconed, DeckMissingModal } from '@/components';
import { useApp, inventoryStore } from '@/context';

const InventoryMissingButton = ({
  clan,
  type,
  discipline,
  missingCryptByClan,
  missingLibraryByType,
  missingLibraryByDiscipline,
}) => {
  const {
    isDesktop,
    cryptCardBase,
    libraryCardBase,
    publicName,
    setShowFloatingButtons,
    setShowMenuButtons,
  } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const [showModal, setShowModal] = useState();

  const handleClose = () => {
    setShowModal(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const missingCrypt = useMemo(() => {
    if (missingCryptByClan) return missingCryptByClan[clan];
    else return {};
  }, [clan, missingCryptByClan]);

  const missingLibrary = useMemo(() => {
    if (missingLibraryByDiscipline && missingLibraryByType) {
      const missing = {};
      Object.values(missingLibraryByType[type])
        .filter((i) => {
          return missingLibraryByDiscipline[discipline][i.c.Id];
        })
        .map((i) => (missing[i.c.Id] = i));
      return missing;
    } else {
      return {};
    }
  }, [type, discipline, missingLibraryByType, missingLibraryByDiscipline]);

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
        (missAllVtesCrypt[cardid] = { q: 1, c: cryptCardBase[cardid] }),
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
        (missAllVtesLibrary[cardid] = { q: 1, c: libraryCardBase[cardid] }),
    );

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
          inInventory
        />
      )}
    </>
  );
};

export default InventoryMissingButton;
