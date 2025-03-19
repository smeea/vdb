import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Gem from '@icons/gem.svg?react';
import {
  ButtonIconed,
  DeckCrypt,
  DeckExportButton,
  DeckLibrary,
  FlexGapped,
  Modal,
} from '@/components';
import { CRYPT, LIBRARY, NAME } from '@/constants';
import { useApp } from '@/context';

const DeckMissingModal = ({ setShow, deck, missAllVtes, inInventory }) => {
  const { isMobile, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [showMissAll, setShowMissAll] = useState();

  const handleClose = () => {
    setShow(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <Modal handleClose={handleClose} size="lg" title={deck[NAME]} noPadding={isMobile}>
      <FlexGapped className="flex-col">
        <FlexGapped className="max-sm:flex-col">
          <div className="basis-full md:basis-5/9">
            <div
              className={twMerge(
                !(isMobile || inInventory) && 'bg-bgPrimary dark:bg-bgPrimaryDark top-[22px] z-10',
              )}
            >
              <DeckCrypt
                deck={{
                  [CRYPT]: showMissAll ? missAllVtes[CRYPT] : deck[CRYPT],
                }}
                inMissing
              />
            </div>
          </div>
          <div className="basis-full md:basis-4/9">
            <DeckLibrary
              deck={{
                [LIBRARY]: showMissAll ? missAllVtes[LIBRARY] : deck[LIBRARY],
              }}
              inMissing
            />
          </div>
        </FlexGapped>
        <div className="flex justify-end gap-2 max-sm:flex-col max-sm:p-2 max-sm:pt-0">
          {inInventory && (
            <ButtonIconed
              onClick={() => setShowMissAll(!showMissAll)}
              text={
                showMissAll
                  ? 'Show Missing In Inventory'
                  : 'Show Missing for Complete Collection (SLOW!)'
              }
              icon={<Gem />}
            />
          )}
          <DeckExportButton
            deck={{
              [NAME]: deck[NAME],
              [CRYPT]: showMissAll ? missAllVtes[CRYPT] : deck[CRYPT],
              [LIBRARY]: showMissAll ? missAllVtes[LIBRARY] : deck[LIBRARY],
            }}
            inMissing
          />
        </div>
      </FlexGapped>
    </Modal>
  );
};

export default DeckMissingModal;
