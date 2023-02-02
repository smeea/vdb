import React, { useState } from 'react';
import { Input, Modal, Button, ErrorOverlay } from '@/components';
import { useApp } from '@/context';

const ModalConfirmation = ({
  title,
  buttonText,
  withConfirmation,
  handleConfirm,
  handleCancel,
  bordered,
  centered,
  size,
  children,
}) => {
  const { isMobile } = useApp();
  const [confirmation, setConfirmation] = useState('');
  const [errorConfirmation, setErrorConfirmation] = useState(false);

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
    <Modal
      handleClose={cancel}
      centered={centered ?? isMobile}
      size={size}
      title={title}
      bordered={bordered}
    >
      <div className="space-y-3 sm:space-y-5">
        {children && (
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            {children}
          </div>
        )}
        <div className="flex justify-end space-x-2">
          {withConfirmation && (
            <form onSubmit={confirm}>
              <Input
                placeholder="Type 'YES' to confirm"
                name="text"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                autoFocus={true}
              />
              {errorConfirmation && (
                <ErrorOverlay placement="bottom">
                  Type &apos;YES&apos; to confirm
                </ErrorOverlay>
              )}
            </form>
          )}
          <div className="flex justify-between space-x-2">
            {buttonText ? (
              <Button variant="primary" onClick={confirm}>
                {buttonText}
              </Button>
            ) : (
              <div />
            )}
            <Button variant="primary" onClick={cancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmation;
