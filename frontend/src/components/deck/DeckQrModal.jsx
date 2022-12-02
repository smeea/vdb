import React, { Suspense } from 'react';
import { Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import Snow from 'assets/images/icons/snow.svg';
import { useApp } from 'context';

const DeckQrModal = ({ qrUrl, setQrUrl, deck }) => {
  const QRCode = React.lazy(() => import('react-qr-code'));
  const { setShowMenuButtons, setShowFloatingButtons } = useApp();

  const handleClose = () => {
    setQrUrl(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <Modal show={true} onHide={handleClose} animation={false} centered={true}>
      <Modal.Header className="no-border pt-3 pb-0">
        <h5>QR for {deck.name}</h5>
        <div className="d-flex align-items-center">
          {(deck.isNonEditable || qrUrl.includes('decks/deck?')) && (
            <div title="Non-editable" className="d-flextext-blue px-2">
              <Snow width="26" height="26" viewBox="0 0 16 16" />
            </div>
          )}
          <Button variant="outline-secondary" onClick={handleClose}>
            <X width="32" height="32" viewBox="0 0 16 16" />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center p-2 p-md-4">
        <div style={{ background: 'white', padding: '4px' }}>
          <a href={qrUrl}>
            <Suspense fallback={<div />}>
              <QRCode size={320} level="L" title={qrUrl} value={qrUrl} />
            </Suspense>
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeckQrModal;
