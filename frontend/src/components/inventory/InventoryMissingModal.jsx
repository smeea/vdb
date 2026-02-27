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
import { CRYPT, LIBRARY, MISSING, NAME, SURPLUS } from "@/constants";
import { inventoryStore, useApp } from "@/context";
import { useInventoryCrypt, useInventoryLibrary } from "@/hooks";
import { cryptSort, getIsPlaytest, librarySort } from "@/utils";

const InventoryMissingModal = ({
  cryptClan,
  libraryClan,
  type,
  discipline,
  crypt,
  library,
  category,
  onlyNotes,
  setShow,
  isSurplus,
}) => {
  const { cryptCardBase, libraryCardBase, isMobile, setShowFloatingButtons, setShowMenuButtons } =
    useApp();
  const { [CRYPT]: inventoryCrypt, [LIBRARY]: inventoryLibrary } = useSnapshot(inventoryStore);
  const { [SURPLUS]: surplusCrypt, [MISSING]: missingCrypt } = useInventoryCrypt(
    crypt,
    category,
    false,
    cryptClan,
    onlyNotes,
  );
  const { [SURPLUS]: surplusLibrary, [MISSING]: missingLibrary } = useInventoryLibrary(
    library,
    category,
    false,
    type,
    discipline,
    libraryClan,
    onlyNotes,
  );
  const [showCryptOnMobile, setShowCryptOnMobile] = useState(true);
  const [showAll, setShowAll] = useState();

  const cryptSorted = cryptSort(Object.values(isSurplus ? surplusCrypt : missingCrypt), NAME);
  const librarySorted = librarySort(
    Object.values(isSurplus ? surplusLibrary : missingLibrary),
    NAME,
  );

  const allVtesCryptSorted = cryptSort(
    Object.keys(cryptCardBase)
      .filter((cardid) => !getIsPlaytest(cardid) && !inventoryCrypt?.[cardid]?.q)
      .map((cardid) => ({ q: 1, c: cryptCardBase[cardid] })),
    NAME,
  );

  const allVtesLibrarySorted = librarySort(
    Object.keys(libraryCardBase)
      .filter((cardid) => !getIsPlaytest(cardid) && !inventoryLibrary?.[cardid]?.q)
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
      title={`${isSurplus ? "Surplus" : "Missing"} Inventory Cards`}
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
            <InventoryCryptTable inMissing cards={showAll ? allVtesCryptSorted : cryptSorted} />
          </div>
          <div
            className={twMerge(
              showCryptOnMobile ? "hidden" : "flex",
              "basis-full flex-col sm:flex sm:basis-4/9 sm:gap-2 lg:gap-3 xl:gap-4",
            )}
          >
            <InventoryLibraryTable
              inMissing
              cards={showAll ? allVtesLibrarySorted : librarySorted}
            />
          </div>
        </FlexGapped>
        <div className="flex justify-end gap-2 max-sm:flex-col max-sm:p-2 max-sm:pt-0">
          {!isSurplus && (
            <ButtonIconed
              onClick={() => setShowAll(!showAll)}
              text={showAll ? "Show Missing for Decks" : "Show Missing for Complete Collection"}
              icon={<Gem />}
            />
          )}
          <DeckExportButton
            deck={{
              [NAME]: `${isSurplus ? "Surplus" : "Missing"} Inventory Cards`,
              [CRYPT]: showAll ? allVtesCryptSorted : cryptSorted,
              [LIBRARY]: showAll ? allVtesLibrarySorted : librarySorted,
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
