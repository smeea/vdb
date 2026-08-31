import Cart from "@icons/cart.svg?react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  ButtonIconed,
  DeckCrypt,
  DeckExportButton,
  DeckLibrary,
  FlexGapped,
  InventoryMissingPrecons,
  Modal,
} from "@/components";
import { CRYPT, LIBRARY, NAME } from "@/constants";
import { useApp } from "@/context";

const DeckMissingModal = ({ setShow, deck }) => {
  const { isMobile, setShowFloatingButtons, setShowMenuButtons } = useApp();

  const handleClose = () => {
    setShow(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const [showPrecons, setShowPrecons] = useState();

  return (
    <Modal handleClose={handleClose} size="lg" title={deck[NAME]} noPadding={isMobile}>
      <FlexGapped className="flex-col">
        <FlexGapped className="max-sm:flex-col">
          <div className="basis-full md:basis-5/9">
            <div
              className={twMerge(!isMobile && "top-[22px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark")}
            >
              <DeckCrypt
                deck={{
                  [CRYPT]: deck[CRYPT],
                }}
                inMissing
              />
            </div>
          </div>
          <div className="basis-full md:basis-4/9">
            <DeckLibrary
              deck={{
                [LIBRARY]: deck[LIBRARY],
              }}
              inMissing
            />
          </div>
        </FlexGapped>
        <div className="flex justify-end gap-2 max-sm:flex-col max-sm:p-2 max-sm:pt-0">
          <ButtonIconed
            onClick={() => setShowPrecons(!showPrecons)}
            text="Precons with Missing Cards"
            icon={<Cart />}
          />
          <DeckExportButton
            deck={{
              [NAME]: deck[NAME],
              [CRYPT]: deck[CRYPT],
              [LIBRARY]: deck[LIBRARY],
            }}
            inMissing
          />
        </div>
      </FlexGapped>
      {showPrecons && (
        <InventoryMissingPrecons
          setShow={setShowPrecons}
          crypt={deck[CRYPT]}
          library={deck[LIBRARY]}
        />
      )}
    </Modal>
  );
};

export default DeckMissingModal;
