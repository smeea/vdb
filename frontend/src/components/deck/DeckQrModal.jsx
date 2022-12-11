import React, { Suspense } from 'react';
import Snow from 'assets/images/icons/snow.svg';
import { Modal } from 'components';
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
    <Modal
      handleClose={handleClose}
      centered
      title={
        <div className="flex justify-between">
          QR for ${deck.name}
          {(deck.isNonEditable || qrUrl.includes('decks/deck?')) && (
            <div className="text-blue flex " title="Non-editable">
              <Snow width="26" height="26" viewBox="0 0 16 16" />
            </div>
          )}
        </div>
      }
    >
      <div className="flex justify-center">
        <div style={{ background: 'white', padding: '4px' }}>
          <a href={qrUrl}>
            <Suspense fallback={<div />}>
              <QRCode size={320} level="L" title={qrUrl} value={qrUrl} />
            </Suspense>
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default DeckQrModal;
