import React, { useState } from 'react';
import Gem from 'assets/images/icons/gem.svg';
import {
  DeckCrypt,
  DeckLibrary,
  DeckExportButton,
  ButtonIconed,
  Modal,
} from 'components';
import { useApp } from 'context';

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
      dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
      title={deck.name}
    >
      <div>
        <div className="flex flex-row pb-4 pb-md-2 px-0">
          <div className="basis-full md:basis-7/12 px-0 ps-lg-4 pe-lg-3">
            <div className={isMobile || inInventory ? null : 'sticky-modal'}>
              <DeckCrypt
                deck={{ ...deck, crypt: crypt, library: library }}
                inMissing
              />
            </div>
          </div>
          <div className="basis-full md:basis-5/12 px-0 ps-lg-3 pe-lg-4">
            <DeckLibrary
              deck={{ ...deck, crypt: crypt, library: library }}
              inMissing
            />
          </div>
        </div>
        <div
          className={
            isMobile
              ? 'flex justify-end pt-2 py-2'
              : 'flex justify-end px-2 pb-4'
          }
        >
          {inInventory && (
            <div className="ps-2">
              <ButtonIconed
                variant="primary"
                onClick={handleMissAllVtes}
                text="Missing for Complete VTES Collection (SLOW!)"
                icon={<Gem />}
              />
            </div>
          )}
          <div className="ps-2">
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
