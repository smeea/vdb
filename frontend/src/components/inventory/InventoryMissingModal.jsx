import Gem from "@icons/gem.svg?react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  ButtonFloat,
  ButtonIconed,
  DeckExportButton,
  FlexGapped,
  InventoryCryptTable,
  InventoryLibraryTable,
  Modal,
} from "@/components";
import { CRYPT, ID, LIBRARY, NAME } from "@/constants";
import { inventoryStore, useApp } from "@/context";
import { useInventoryCrypt, useInventoryLibrary } from "@/hooks";
import { cryptSort, getIsPlaytest, librarySort } from "@/utils";

const InventoryMissingModal = ({
  clan,
  type,
  discipline,
  crypt,
  library,
  category,
  onlyNotes,
  setShow,
}) => {
  const { cryptCardBase, libraryCardBase, isMobile, setShowFloatingButtons, setShowMenuButtons } =
    useApp();
  const { [CRYPT]: inventoryCrypt, [LIBRARY]: inventoryLibrary } = useSnapshot(inventoryStore);
  const { missingByClan } = useInventoryCrypt(crypt, category, false, onlyNotes);
  const { missingByType, missingByDiscipline } = useInventoryLibrary(
    library,
    category,
    false,
    type,
    discipline,
    onlyNotes,
  );
  const [showCryptOnMobile, setShowCryptOnMobile] = useState(true);
  const [showMissAll, setShowMissAll] = useState();

  const missingCrypt = missingByClan ? missingByClan[clan] : {};

  const missingLibrary = {};
  if (missingByDiscipline && missingByType) {
    Object.values(missingByType[type])
      .filter((i) => {
        return missingByDiscipline[discipline][i.c[ID]];
      })
      .forEach((i) => {
        missingLibrary[i.c[ID]] = i;
      });
  }

  const missingCryptSorted = cryptSort(Object.values(missingCrypt), NAME);
  const missingLibrarySorted = librarySort(Object.values(missingLibrary), NAME);

  const missAllVtesCryptSorted = cryptSort(
    Object.keys(cryptCardBase)
      .filter((cardid) => {
        return !getIsPlaytest(cardid) && (!inventoryCrypt[cardid] || !inventoryCrypt[cardid]?.q);
      })
      .map((cardid) => ({ q: 1, c: cryptCardBase[cardid] })),
    NAME,
  );

  const missAllVtesLibrarySorted = librarySort(
    Object.keys(libraryCardBase)
      .filter((cardid) => {
        return (
          !getIsPlaytest(cardid) && (!inventoryLibrary[cardid] || !inventoryLibrary[cardid]?.q)
        );
      })
      .map((cardid) => ({ q: 1, c: libraryCardBase[cardid] })),
    NAME,
  );

  const handleClose = () => {
    setShow(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <Modal
      handleClose={handleClose}
      size="lg"
      title="Missing cards for Inventory"
      noPadding={isMobile}
    >
      <FlexGapped className="flex-col">
        <FlexGapped className="max-sm:flex-col">
          <div
            className={twMerge(
              showCryptOnMobile ? "flex" : "hidden",
              "basis-full flex-col sm:flex sm:basis-5/9 sm:gap-2 lg:gap-3 xl:gap-4",
            )}
          >
            <InventoryCryptTable
              inMissing
              cards={showMissAll ? missAllVtesCryptSorted : missingCryptSorted}
            />
          </div>
          <div
            className={twMerge(
              showCryptOnMobile ? "hidden" : "flex",
              "basis-full flex-col sm:flex sm:basis-4/9 sm:gap-2 lg:gap-3 xl:gap-4",
            )}
          >
            <InventoryLibraryTable
              inMissing
              cards={showMissAll ? missAllVtesLibrarySorted : missingLibrarySorted}
            />
          </div>
        </FlexGapped>
        <div className="flex justify-end gap-2 max-sm:flex-col max-sm:p-2 max-sm:pt-0">
          <ButtonIconed
            onClick={() => setShowMissAll(!showMissAll)}
            text={showMissAll ? "Show Missing for Decks" : "Show Missing for Complete Collection"}
            icon={<Gem />}
          />
          <DeckExportButton
            deck={{
              [NAME]: "Missing cards for Inventory",
              [CRYPT]: showMissAll ? missAllVtesCryptSorted : missingCryptSorted,
              [LIBRARY]: showMissAll ? missAllVtesLibrarySorted : missingLibrarySorted,
            }}
            inMissing
          />
        </div>
      </FlexGapped>
      <ButtonFloat
        className="sm:hidden"
        onClick={() => setShowCryptOnMobile(!showCryptOnMobile)}
        position="middle"
      >
        <div className="text-2xl">{showCryptOnMobile ? "LIB" : "CR"}</div>
      </ButtonFloat>
    </Modal>
  );
};

export default InventoryMissingModal;
