import React, { useEffect, useState } from 'react';
import Cart4 from 'assets/images/icons/cart4.svg';
import { DeckMissingModal } from 'components';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const InventoryMissingButton = ({ type, clan, discipline }) => {
  const {
    inventoryCrypt,
    inventoryLibrary,
    usedCryptCards,
    usedLibraryCards,
    cryptCardBase,
    libraryCardBase,
    username,
    setShowFloatingButtons,
    setShowMenuButtons,
  } = useApp();

  const [showModal, setShowModal] = useState(undefined);
  const [missingCrypt, setMissingCrypt] = useState(undefined);
  const [missingLibrary, setMissingLibrary] = useState(undefined);

  const calculateMissing = () => {
    const crypt = {};
    const library = {};

    Object.keys(usedCryptCards.soft)
      .filter((card) => {
        if (clan === 'All' || cryptCardBase[card].Clan === clan) return true;
      })
      .map((card) => {
        if (!inventoryCrypt[card]) {
          let softUsedMax = 0;
          Object.keys(usedCryptCards.soft[card]).map((id) => {
            if (softUsedMax < usedCryptCards.soft[card][id]) {
              softUsedMax = usedCryptCards.soft[card][id];
            }
          });

          crypt[card] = { q: softUsedMax, c: cryptCardBase[card] };
        }
      });

    Object.keys(usedLibraryCards.soft)
      .filter((card) => {
        if (type !== 'All' && !libraryCardBase[card].Type.includes(type))
          return false;
        if (
          discipline !== 'All' &&
          !libraryCardBase[card].Discipline.includes(discipline)
        )
          return false;
        return true;
      })
      .map((card) => {
        if (!inventoryLibrary[card]) {
          let softUsedMax = 0;
          Object.keys(usedLibraryCards.soft[card]).map((id) => {
            if (softUsedMax < usedLibraryCards.soft[card][id]) {
              softUsedMax = usedLibraryCards.soft[card][id];
            }
          });

          library[card] = { q: softUsedMax, c: libraryCardBase[card] };
        }
      });

    Object.keys(usedCryptCards.hard)
      .filter((card) => {
        if (clan === 'All' || cryptCardBase[card].Clan === clan) return true;
      })
      .map((card) => {
        if (!inventoryCrypt[card]) {
          let hardUsedTotal = 0;
          if (usedCryptCards.hard[card]) {
            Object.keys(usedCryptCards.hard[card]).map((id) => {
              hardUsedTotal += usedCryptCards.hard[card][id];
            });
          }

          if (crypt[card]) {
            crypt[card].q += hardUsedTotal;
          } else {
            crypt[card] = { q: hardUsedTotal, c: cryptCardBase[card] };
          }
        }
      });

    Object.keys(usedLibraryCards.hard)
      .filter((card) => {
        if (type !== 'All' && !libraryCardBase[card].Type.includes(type))
          return false;
        if (
          discipline !== 'All' &&
          !libraryCardBase[card].Discipline.includes(discipline)
        )
          return false;
        return true;
      })
      .map((card) => {
        if (!inventoryLibrary[card]) {
          let hardUsedTotal = 0;
          if (usedLibraryCards.hard[card]) {
            Object.keys(usedLibraryCards.hard[card]).map((id) => {
              hardUsedTotal += usedLibraryCards.hard[card][id];
            });
          }

          if (library[card]) {
            library[card].q += hardUsedTotal;
          } else {
            library[card] = {
              q: hardUsedTotal,
              c: libraryCardBase[card],
            };
          }
        }
      });

    setMissingCrypt(crypt);
    setMissingLibrary(library);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  useEffect(() => {
    if (missingCrypt !== undefined && missingLibrary !== undefined) {
      setShowModal(true);
    }
  }, [missingCrypt, missingLibrary]);

  return (
    <>
      <ButtonIconed
        variant="secondary"
        onClick={() => calculateMissing()}
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
          show={showModal}
          handleClose={handleClose}
          inInventory={true}
        />
      )}
    </>
  );
};

export default InventoryMissingButton;
