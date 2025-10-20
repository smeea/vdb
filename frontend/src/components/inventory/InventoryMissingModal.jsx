import Gem from "@icons/gem.svg?react";
import { useMemo, useState } from "react";
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
import { getIsPlaytest } from "@/utils";

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

  const missingCrypt = useMemo(() => {
    if (missingByClan) return missingByClan[clan];
    return {};
  }, [clan, missingByClan]);

  const missingLibrary = useMemo(() => {
    if (missingByDiscipline && missingByType) {
      const missing = {};
      Object.values(missingByType[type])
        .filter((i) => {
          return missingByDiscipline[discipline][i.c[ID]];
        })
        .forEach((i) => {
          missing[i.c[ID]] = i;
        });
      return missing;
    }
    return {};
  }, [type, discipline, missingByType, missingByDiscipline]);

  const missAllVtesCrypt = {};
  const missAllVtesLibrary = {};

  Object.keys(cryptCardBase)
    .filter((cardid) => {
      return !getIsPlaytest(cardid) && (!inventoryCrypt[cardid] || !inventoryCrypt[cardid]?.q);
    })
    .forEach((cardid) => {
      missAllVtesCrypt[cardid] = { q: 1, c: cryptCardBase[cardid] };
    });

  Object.keys(libraryCardBase)
    .filter((cardid) => {
      return !getIsPlaytest(cardid) && (!inventoryLibrary[cardid] || !inventoryLibrary[cardid]?.q);
    })
    .forEach((cardid) => {
      missAllVtesLibrary[cardid] = { q: 1, c: libraryCardBase[cardid] };
    });

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
              cards={Object.values(showMissAll ? missAllVtesCrypt : missingCrypt)}
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
              cards={Object.values(showMissAll ? missAllVtesLibrary : missingLibrary)}
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
              [CRYPT]: showMissAll ? missAllVtesCrypt : missingCrypt,
              [LIBRARY]: showMissAll ? missAllVtesLibrary : missingLibrary,
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
