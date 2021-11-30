import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Cart4 from 'assets/images/icons/cart4.svg';
import { DeckMissingModal } from 'components';
import AppContext from 'context/AppContext.js';

function InventoryMissing(props) {
  const {
    inventoryCrypt,
    inventoryLibrary,
    usedCryptCards,
    usedLibraryCards,
    cryptCardBase,
    libraryCardBase,
    isMobile,
  } = useContext(AppContext);

  const [showModal, setShowModal] = useState(undefined);
  const [missingCrypt, setMissingCrypt] = useState(undefined);
  const [missingLibrary, setMissingLibrary] = useState(undefined);

  const calculateMissing = () => {
    const missingCrypt = {};
    const missingLibrary = {};

    Object.keys(inventoryCrypt).map((card) => {
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

    Object.keys(inventoryLibrary).map((card) => {
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

    Object.keys(usedCryptCards.soft).map((card) => {
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

    Object.keys(usedLibraryCards.soft).map((card) => {
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

    Object.keys(usedCryptCards.hard).map((card) => {
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

    Object.keys(usedLibraryCards.hard).map((card) => {
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
          missingLibrary[card] = { q: hardUsedTotal, c: libraryCardBase[card] };
        }
      }
    });

    setMissingCrypt(missingCrypt);
    setMissingLibrary(missingLibrary);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    isMobile && props.setShowButtons(false);
  };

  useEffect(() => {
    if (missingCrypt !== undefined && missingLibrary !== undefined) {
      setShowModal(true);
    }
  }, [missingCrypt, missingLibrary]);

  return (
    <>
      <Button variant="secondary" onClick={() => calculateMissing()}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="pe-2">
            <Cart4 />
          </div>
          Missing Cards
        </div>
      </Button>
      {showModal && (
        <DeckMissingModal
          crypt={missingCrypt}
          library={missingLibrary}
          name="Inventory"
          show={showModal}
          setShow={setShowModal}
          handleClose={handleCloseModal}
          setShowButtons={props.setShowButtons}
          inInventory={true}
        />
      )}
    </>
  );
}

export default InventoryMissing;
