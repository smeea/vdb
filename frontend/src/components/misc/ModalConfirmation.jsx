import React, { useState, useRef } from 'react';
import { Modal, Button, ErrorOverlay } from 'components';
import { useApp } from 'context';

const ModalConfirmation = ({
  headerText,
  mainText,
  buttonText,
  withConfirmation,
  handleConfirm,
  handleCancel,
  nested,
  size,
}) => {
  const { isMobile } = useApp();
  const [confirmation, setConfirmation] = useState('');
  const [errorConfirmation, setErrorConfirmation] = useState(false);
  const refConfirmation = useRef(null);

  const confirm = () => {
    if (withConfirmation) {
      if (confirmation === 'YES') {
        setErrorConfirmation(false);
        setConfirmation('');
        handleConfirm();
      } else {
        setErrorConfirmation(true);
      }
    } else {
      handleConfirm();
    }
  };

  const cancel = () => {
    setErrorConfirmation(false);
    setConfirmation('');
    handleCancel();
  };

  return (
    <>
      <Modal
        handleClose={cancel}
        centered={isMobile}
        size={size ?? null}
        dialogClassName={nested ? 'nested-modal' : 'no-border'}
        title={headerText}
      >
        {mainText && <div className="font-bold text-blue">{mainText}</div>}
        {withConfirmation && (
          <form onSubmit={confirm}>
            <div className="form-control">
              <input
                placeholder="Type 'YES' to confirm"
                name="text"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                autoFocus={true}
                ref={refConfirmation}
              />
            </div>
            <ErrorOverlay
              show={errorConfirmation}
              target={refConfirmation.current}
              placement="bottom"
              modal={true}
            >
              Type &apos;YES&apos; to confirm
            </ErrorOverlay>
          </form>
        )}
        {buttonText && (
          <Button variant="danger" onClick={confirm}>
            {buttonText}
          </Button>
        )}
        <Button variant="primary" onClick={cancel}>
          Cancel
        </Button>
      </Modal>
    </>
  );
};

export default ModalConfirmation;
