import React, { useState } from 'react';
import { Input, Modal, Button, ErrorOverlay } from '@/components';
import { useApp } from '@/context';

const ModalConfirmation = ({
  title,
  buttonText,
  withWrittenConfirmation,
  handleConfirm,
  handleCancel,
  nested,
  centered,
  size = 'sm',
  disabled,
  children,
  buttonVariant = 'primary',
}) => {
  const { isMobile } = useApp();
  const [confirmation, setConfirmation] = useState('');
  const [errorConfirmation, setErrorConfirmation] = useState(false);

  const handleClick = () => {
    if (withWrittenConfirmation) {
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

  const handleClose = () => {
    setErrorConfirmation(false);
    setConfirmation('');
    handleCancel();
  };

  return (
    <Modal
      handleClose={handleClose}
      centered={centered ?? isMobile}
      size={size}
      title={title}
      nested={nested}
    >
      <div className="flex flex-col gap-3 sm:gap-5">
        {children && (
          <div className="text-fgSecondary dark:text-fgSecondaryDark">
            {children}
          </div>
        )}
        <div className="flex justify-end gap-2">
          {withWrittenConfirmation && (
            <form onSubmit={handleClick}>
              <Input
                placeholder="Type 'YES' to confirm"
                name="text"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                autoFocus
              />
              {errorConfirmation && (
                <ErrorOverlay placement="bottom">
                  Type &apos;YES&apos; to confirm
                </ErrorOverlay>
              )}
            </form>
          )}
          <div className="flex justify-between gap-2">
            <Button
              disabled={disabled}
              variant={buttonVariant}
              onClick={handleClick}
            >
              {buttonText}
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmation;
