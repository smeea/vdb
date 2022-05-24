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
    const missingCrypt = {};
    const missingLibrary = {};

    Object.keys(inventoryCrypt)
      .filter((card) => {
        if (clan === 'All' || cryptCardBase[card].Clan === clan) return true;
      })
      .map((card) => {
        let softUsedMax = 0;
        if (usedCryptCards.soft[card]) {
          Object.keys(usedCryptCards.soft[card]).map((id) => {
            if (softUsedMax < usedCryptCards.soft[card][id]) {
              softUsedMax = usedCryptCards.soft[card][id];
            }
          });
        }

        let hardUsedTotal = 0;
        if (usedCryptCards.hard[card]) {
          Object.keys(usedCryptCards.hard[card]).map((id) => {
            hardUsedTotal += usedCryptCards.hard[card][id];
          });
        }

        const miss = softUsedMax + hardUsedTotal - inventoryCrypt[card].q;

        if (miss > 0) {
          missingCrypt[card] = { q: miss, c: inventoryCrypt[card].c };
        }
      });

    Object.keys(inventoryLibrary)
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
        let softUsedMax = 0;
        if (usedLibraryCards.soft[card]) {
          Object.keys(usedLibraryCards.soft[card]).map((id) => {
            if (softUsedMax < usedLibraryCards.soft[card][id]) {
              softUsedMax = usedLibraryCards.soft[card][id];
            }
          });
        }

        let hardUsedTotal = 0;
        if (usedLibraryCards.hard[card]) {
          Object.keys(usedLibraryCards.hard[card]).map((id) => {
            hardUsedTotal += usedLibraryCards.hard[card][id];
          });
        }

        const miss = softUsedMax + hardUsedTotal - inventoryLibrary[card].q;

        if (miss > 0) {
          missingLibrary[card] = { q: miss, c: inventoryLibrary[card].c };
        }
      });

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

          missingCrypt[card] = { q: softUsedMax, c: cryptCardBase[card] };
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

          missingLibrary[card] = { q: softUsedMax, c: libraryCardBase[card] };
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

          if (missingCrypt[card]) {
            missingCrypt[card].q += hardUsedTotal;
          } else {
            missingCrypt[card] = { q: hardUsedTotal, c: cryptCardBase[card] };
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

          if (missingLibrary[card]) {
            missingLibrary[card].q += hardUsedTotal;
          } else {
            missingLibrary[card] = {
              q: hardUsedTotal,
              c: libraryCardBase[card],
            };
          }
        }
      });

    setMissingCrypt(missingCrypt);
    setMissingLibrary(missingLibrary);
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
            name: 'Missing card for Inventory',
            author: username,
            description: '',
            crypt: missingCrypt,
            library: missingLibrary,
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
