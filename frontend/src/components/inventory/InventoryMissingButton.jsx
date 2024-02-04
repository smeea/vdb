import React, { useState, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import Cart4 from '@/assets/images/icons/cart4.svg?react';
import { ButtonIconed, DeckMissingModal } from '@/components';
import { useApp, inventoryStore } from '@/context';
import { useInventoryCrypt, useInventoryLibrary } from '@/hooks';

const InventoryMissingButton = ({
  clan,
  type,
  discipline,
  crypt,
  library,
  category,
  onlyNotes,
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

  const { missingByClan } = useInventoryCrypt(
    crypt,
    category,
    false,
    onlyNotes
  );

  const { missingByType, missingByDiscipline } = useInventoryLibrary(
    library,
    category,
    false,
    type,
    discipline,
    onlyNotes
  );

  const missingCrypt = useMemo(() => {
    if (missingByClan) return missingByClan[clan];
    return {};
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
    }
    return {};
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
