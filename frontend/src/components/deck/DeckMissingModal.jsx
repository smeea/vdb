import React, { useState } from 'react';
import Gem from '@/assets/images/icons/gem.svg';
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
      <div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
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
        <div className="flex justify-end">
          {inInventory && (
            <div>
              <ButtonIconed
                variant="primary"
                onClick={handleMissAllVtes}
                text="Missing for Complete VTES Collection (SLOW!)"
                icon={<Gem />}
              />
            </div>
          )}
          <div>
            <DeckExportButton
              deck={{ ...deck, crypt: crypt, library: library }}
              inMissing
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeckMissingModal;
