import React, { useEffect, useState } from 'react';
import Cart4 from 'assets/images/icons/cart4.svg';
import { DeckMissingModal } from 'components';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

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
    username,
    setShowFloatingButtons,
    setShowMenuButtons,
  } = useApp();

  const [showModal, setShowModal] = useState(undefined);
  const [missingCrypt, setMissingCrypt] = useState(undefined);
  const [missingLibrary, setMissingLibrary] = useState({});

  const handleClose = () => {
    setShowModal(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  useEffect(() => {
    if (missingByClan) setMissingCrypt(missingByClan[clan]);
  }, [clan, missingByClan]);

  useEffect(() => {
    if (missingByDiscipline && missingByType) {
      const missing = {};
      Object.values(missingByType[type])
        .filter((i) => {
          return missingByDiscipline[discipline][i.c.Id];
        })
        .map((i) => (missing[i.c.Id] = i));
      setMissingLibrary(missing);
    }
  }, [type, discipline, missingByType, missingByDiscipline]);

  const missAllVtesCrypt = {};
  const missAllVtesLibrary = {};

  Object.keys(cryptCardBase)
    .filter((cardid) => {
      return !inventoryCrypt[cardid] || !inventoryCrypt[cardid].q;
    })
    .map(
      (cardid) =>
        (missAllVtesCrypt[cardid] = { q: 1, c: cryptCardBase[cardid] })
    );

  Object.keys(libraryCardBase)
    .filter((cardid) => {
      return !inventoryLibrary[cardid] || !inventoryLibrary[cardid].q;
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
            author: username,
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
