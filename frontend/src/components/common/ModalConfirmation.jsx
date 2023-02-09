import React, { useState } from 'react';
import { Input, Modal, Button, ErrorOverlay } from '@/components';
import { useApp } from '@/context';

const ModalConfirmation = ({
  title,
  buttonText,
  withWrittenConfirmation,
  handleConfirm,
  handleCancel,
  bordered,
  centered,
  size,
  disabled,
  children,
}) => {
  const { isMobile } = useApp();
  const [confirmation, setConfirmation] = useState('');
  const [errorConfirmation, setErrorConfirmation] = useState(false);

  const confirm = () => {
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
      <div className="flex flex-col gap-3 sm:gap-5">
        {children && (
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            {children}
          </div>
        )}
        <div className="flex justify-end gap-2">
          {withWrittenConfirmation && (
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
          <div className="flex justify-between gap-2">
            <Button disabled={disabled} variant="primary" onClick={confirm}>
              {buttonText}
            </Button>
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
