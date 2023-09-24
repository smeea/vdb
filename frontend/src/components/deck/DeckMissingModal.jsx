import React, { useState } from 'react';
import Gem from '@/assets/images/icons/gem.svg?react';
import {
  DeckCrypt,
  DeckLibrary,
  DeckExportButton,
  ButtonIconed,
  Modal,
} from '@/components';
import { useApp } from '@/context';

const DeckMissingModal = ({ deck, missAllVtes, handleClose, inInventory }) => {
  const { isMobile } = useApp();

  const [crypt, setCrypt] = useState(deck.crypt);
  const [library, setLibrary] = useState(deck.library);

  const handleMissAllVtes = () => {
    setCrypt(missAllVtes.crypt);
    setLibrary(missAllVtes.library);
  };

  return (
    <Modal
      handleClose={handleClose}
      size="lg"
      title={deck.name}
      noPadding={isMobile}
    >
      <div className="flex flex-col gap-3 sm:gap-5">
        <div className="flex gap-3 max-sm:flex-col sm:gap-5">
          <div className="basis-full md:basis-5/9">
            <div
              className={
                isMobile || inInventory
                  ? null
                  : 'top-[22px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark'
              }
            >
              <DeckCrypt
                deck={{ ...deck, crypt: crypt, library: library }}
                inMissing
              />
            </div>
          </div>
          <div className="basis-full md:basis-4/9">
            <DeckLibrary
              deck={{ ...deck, crypt: crypt, library: library }}
              inMissing
            />
          </div>
        </div>
        <div className="flex flex-col justify-end gap-2 max-sm:p-2 max-sm:pt-0 sm:flex-row">
          {inInventory && (
            <ButtonIconed
              variant="primary"
              onClick={handleMissAllVtes}
              text="Missing for Complete VTES Collection (SLOW!)"
              icon={<Gem />}
            />
          )}
          <DeckExportButton
            deck={{ ...deck, crypt: crypt, library: library }}
            inMissing
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeckMissingModal;
