import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import X from 'assets/images/icons/x.svg';
import Snow from 'assets/images/icons/snow.svg';
import { useApp } from 'context';

const DeckQrModal = ({ show, setShow, deck }) => {
  const { setShowMenuButtons, setShowFloatingButtons } = useApp();
  const url = show;

  const handleClose = () => {
    setShow(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const DeckQR = () => {
    return (
      <div style={{ background: 'white', padding: '4px' }}>
        <a href={url}>
          <QRCode size={320} level="L" title={url} value={url} />
        </a>
      </div>
    );
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false} centered={true}>
      <Modal.Header className="no-border pt-3 pb-0">
        <h5>QR for {deck.name}</h5>
        <div className="d-flex align-items-center">
          {(!deck.isEditable || !url.includes('decks?id=')) && (
            <div title="Non-editable" className="d-flex blue px-2">
              <Snow width="26" height="26" viewBox="0 0 16 16" />
            </div>
          )}
          <Button variant="outline-secondary" onClick={handleClose}>
            <X width="32" height="32" viewBox="0 0 16 16" />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center p-2 p-md-4">
        <DeckQR />
      </Modal.Body>
    </Modal>
  );
};

export default DeckQrModal;
