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
        <div className="pb-md-2 flex flex-row px-0 pb-4">
          <div className="pl-lg-4 pr-lg-3 basis-full px-0 md:basis-7/12">
            <div className={isMobile || inInventory ? null : 'sticky-modal'}>
              <DeckCrypt
                deck={{ ...deck, crypt: crypt, library: library }}
                inMissing
              />
            </div>
          </div>
          <div className="pl-lg-3 pr-lg-4 basis-full px-0 md:basis-5/12">
            <DeckLibrary
              deck={{ ...deck, crypt: crypt, library: library }}
              inMissing
            />
          </div>
        </div>
        <div
          className={
            isMobile
              ? 'flex justify-end py-2 pt-2'
              : 'flex justify-end px-2 pb-4'
          }
        >
          {inInventory && (
            <div className="pl-2">
              <ButtonIconed
                variant="primary"
                onClick={handleMissAllVtes}
                text="Missing for Complete VTES Collection (SLOW!)"
                icon={<Gem />}
              />
            </div>
          )}
          <div className="pl-2">
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
