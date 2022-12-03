import React, { useState } from 'react';
import { Modal, Col, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import Gem from 'assets/images/icons/gem.svg';
import {
  DeckCrypt,
  DeckLibrary,
  DeckExportButton,
  ButtonIconed,
} from 'components';
import { useApp } from 'context';

const DeckMissingModal = ({
  deck,
  missAllVtes,
  show,
  handleClose,
  inInventory,
}) => {
  const { isMobile } = useApp();

  const [crypt, setCrypt] = useState(deck.crypt);
  const [library, setLibrary] = useState(deck.library);

  const handleMissAllVtes = () => {
    setCrypt(missAllVtes.crypt);
    setLibrary(missAllVtes.library);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
    >
      <Modal.Header
        className={
          isMobile
            ? 'no-border pt-2 pb-0 ps-2 pe-3'
            : 'no-border pt-3 pb-1 px-4'
        }
      >
        <h5>{deck.name}</h5>
        <Button variant="outline-secondary" onClick={handleClose}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div>
          <div className='flex flex-row pb-4 pb-md-2 px-0'>
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
      </Modal.Body>
    </Modal>
  );
};

export default DeckMissingModal;
